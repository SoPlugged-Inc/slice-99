import { GoogleGenAI } from '@google/genai';
import { Client } from '@notionhq/client';

export default async function handler(req, res) {
  // 1. Security Check (Vercel Cron Secret)
  const authHeader = req.headers.get('authorization');
  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { 
    GOOGLE_API_KEY, 
    NOTION_API_KEY, 
    NOTION_DATABASE_ID,
    TAVILY_API_KEY 
  } = process.env;

  if (!GOOGLE_API_KEY || !NOTION_API_KEY || !NOTION_DATABASE_ID) {
    const missing = [];
    if (!GOOGLE_API_KEY) missing.push('GOOGLE_API_KEY');
    if (!NOTION_API_KEY) missing.push('NOTION_API_KEY');
    if (!NOTION_DATABASE_ID) missing.push('NOTION_DATABASE_ID');
    return res.status(500).json({ message: `Missing credentials: ${missing.join(', ')}` });
  }

  const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });
  const notion = new Client({ auth: NOTION_API_KEY });

  try {
    console.log('Starting Research...');
    
    // 2. Search
    let research = "Found discussions about Canadian ecommerce founders struggling with high Meta ad CPAs and the need for authentic content to build trust in skincare and CPG niches.";
    if (TAVILY_API_KEY) {
      const searchRes = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: TAVILY_API_KEY,
          query: "ecommerce CPG founder questions forums Canada UGC challenges 2024",
          search_depth: "advanced",
          include_answer: true,
          max_results: 3
        })
      });
      const searchData = await searchRes.json();
      research = searchData.answer || JSON.stringify(searchData.results);
    }

    // 3. Generate with Retry
    const prompt = `
      You are a Growth Marketing Agent for "Slice", a fractionalized UGC platform.
      Based on this research: "${research}"
      Write a realistic Case Study JSON: title, description, category, problem, lever, result, outcome_summary
      Format: Problem/Lever/Result. Metrics: specific ROAS/CAC numbers.
    `;
    
    let genResult;
    let retries = 3;
    while (retries > 0) {
      try {
        genResult = await ai.models.generateContent({
          model: 'gemini-flash-latest',
          contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });
        break; // Success!
      } catch (err) {
        retries--;
        console.error(`AI Generation failed. Retries left: ${retries}`, err.message);
        if (retries === 0) throw err;
        // Wait 2 seconds before retrying
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    const data = JSON.parse(genResult.text.replace(/```json|```/g, '').trim());

    // 4. Push to Notion
    await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        Name: { title: [{ text: { content: data.title } }] },
        Description: { rich_text: [{ text: { content: data.description } }] },
        Slug: { rich_text: [{ text: { content: data.title.toLowerCase().replace(/ /g, '-') } }] },
        Category: { select: { name: data.category || 'CPG' } },
        Results: { rich_text: [{ text: { content: data.outcome_summary } }] },
        Date: { date: { start: new Date().toISOString().split('T')[0] } },
        Status: { status: { name: 'Published' } }
      },
      children: [
        { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ text: { content: 'The Problem' } }] } },
        { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ text: { content: data.problem } }] } },
        { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ text: { content: 'The Lever' } }] } },
        { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ text: { content: data.lever } }] } },
        { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ text: { content: 'The Result' } }] } },
        { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ text: { content: data.result } }] } }
      ]
    });

    return res.status(200).json({ message: 'Success', study: data.title });
  } catch (error) {
    console.error('Growth Agent Error:', error);
    
    if (error.message?.includes('429') || error.status === 'RESOURCE_EXHAUSTED' || error.message?.includes('quota')) {
      return res.status(429).json({ 
        message: 'Quota Exhausted', 
        error: 'Google AI API quota reached. Please check your billing or usage limits in Google AI Studio.' 
      });
    }

    return res.status(500).json({ message: 'Error', error: error.message });
  }
}
