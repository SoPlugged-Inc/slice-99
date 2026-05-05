const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

const { NOTION_API_KEY, NOTION_DATABASE_ID } = process.env;

async function generateSnippets() {
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    console.error('Missing Notion credentials. Skipping snippets generation.');
    return;
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          property: 'Status',
          status: {
            equals: 'Published',
          },
        },
      }),
    });

    const data = await response.json();
    
    const snippets = data.results.map((page) => {
      const title = page.properties.Name?.title[0]?.plain_text || 'Untitled';
      const description = page.properties.Description?.rich_text[0]?.plain_text || '';
      const slug = page.properties.Slug?.rich_text[0]?.plain_text || page.id;
      const date = page.properties.Date?.date?.start || page.created_time;
      const category = page.properties.Category?.select?.name || '';
      const results = page.properties.Results?.rich_text[0]?.plain_text || '';

      // Ensure 100-word limit approximately
      const summary = description.split(' ').slice(0, 100).join(' ') + (description.split(' ').length > 100 ? '...' : '');

      return {
        title,
        url: `https://slice99.com/blog#${slug}`,
        date,
        summary,
        category,
        results
      };
    });

    const outputPath = path.join(__dirname, '../public/snippets.json');
    fs.writeFileSync(outputPath, JSON.stringify(snippets, null, 2));
    console.log(`Successfully generated ${snippets.length} snippets at public/snippets.json`);
  } catch (error) {
    console.error('Error generating snippets:', error);
  }
}

generateSnippets();
