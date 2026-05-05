import { GoogleGenerativeAI } from '@google/genai';
import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const { 
  GOOGLE_API_KEY, 
  NOTION_API_KEY, 
  NOTION_DATABASE_ID,
  TAVILY_API_KEY // Optional: for web search
} = process.env;

if (!GOOGLE_API_KEY || !NOTION_API_KEY || !NOTION_DATABASE_ID) {
  console.error('Missing required environment variables. Please check GOOGLE_API_KEY, NOTION_API_KEY, and NOTION_DATABASE_ID.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const notion = new Client({ auth: NOTION_API_KEY });

async function searchWeb(query) {
  if (!TAVILY_API_KEY) {
    console.log('No TAVILY_API_KEY found. Using fallback mock research data.');
    return `Found discussions about Canadian ecommerce founders struggling with high Meta ad CPAs and the need for authentic content to build trust in skincare and CPG niches. Specific mention of "trust gap" in wellness brands.`;
  }

  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query: query,
        search_depth: "advanced",
        include_answer: true,
        max_results: 5
      })
    });
    const data = await response.json();
    return data.answer || JSON.stringify(data.results);
  } catch (error) {
    console.error('Search error:', error);
    return null;
  }
}

async function generateCaseStudy(research) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
    You are a Growth Marketing Agent for "Slice", a fractionalized UGC platform.
    Based on the following market research research about eCommerce/CPG pain points in Canada:
    
    RESEARCH: "${research}"
    
    Write a real-life (or realistic composite) case study in the following "Problem/Lever/Result" format.
    
    1. Title: Catchy and professional.
    2. Description: A 100-word summary of the case study.
    3. Category: Choose one (SaaS, E-com, CPG).
    4. Problem: Detailed explanation of the founder's struggle.
    5. Lever: How Slice helped (fractionalized UGC, cost-effective, authentic).
    6. Result: Specific metrics (ROAS lift, CAC drop, conversion increase).
    7. Outcome Summary: A one-sentence factual record of the result.
    
    Format the output as JSON so I can parse it easily. 
    Fields: title, description, category, problem, lever, result, outcome_summary
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Clean JSON if it contains markdown markers
    const jsonStr = text.replace(/```json|```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Generation error:', error);
    return null;
  }
}

async function pushToNotion(data) {
  try {
    await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        Name: {
          title: [{ text: { content: data.title } }]
        },
        Description: {
          rich_text: [{ text: { content: data.description } }]
        },
        Slug: {
          rich_text: [{ text: { content: data.title.toLowerCase().replace(/ /g, '-') } }]
        },
        Status: {
          status: { name: 'Draft' } // Default to Draft for human review
        },
        Category: {
          select: { name: data.category }
        },
        Results: {
          rich_text: [{ text: { content: data.outcome_summary } }]
        },
        Date: {
          date: { start: new Date().toISOString().split('T')[0] }
        }
      },
      children: [
        {
          object: 'block',
          type: 'heading_2',
          heading_2: { rich_text: [{ text: { content: 'The Problem' } }] }
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: { rich_text: [{ text: { content: data.problem } }] }
        },
        {
          object: 'block',
          type: 'heading_2',
          heading_2: { rich_text: [{ text: { content: 'The Lever' } }] }
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: { rich_text: [{ text: { content: data.lever } }] }
        },
        {
          object: 'block',
          type: 'heading_2',
          heading_2: { rich_text: [{ text: { content: 'The Result' } }] }
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: { rich_text: [{ text: { content: data.result } }] }
        }
      ]
    });
    console.log('Successfully pushed new case study to Notion!');
  } catch (error) {
    console.error('Notion error:', error);
  }
}

async function main() {
  console.log('Starting Background Growth Agent...');
  
  const query = "ecommerce CPG founder questions forums Canada UGC challenges 2024";
  const research = await searchWeb(query);
  
  if (!research) {
    console.error('Failed to gather research.');
    return;
  }

  console.log('Research gathered. Generating case study...');
  const caseStudy = await generateCaseStudy(research);
  
  if (!caseStudy) {
    console.error('Failed to generate case study.');
    return;
  }

  console.log(`Case Study generated: "${caseStudy.title}". Pushing to Notion...`);
  await pushToNotion(caseStudy);
  
  console.log('Agent run complete.');
}

main();
