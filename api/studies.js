export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { NOTION_API_KEY, NOTION_DATABASE_ID } = process.env;

  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    return res.status(500).json({ 
      message: 'Notion credentials missing.',
      details: 'Ensure NOTION_API_KEY and NOTION_DATABASE_ID are set in the Vercel dashboard.'
    });
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
        sorts: [
          {
            property: 'Date',
            direction: 'descending',
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Notion API returned ${response.status}`);
    }

    const data = await response.json();
    
    const posts = data.results.map((page) => ({
      id: page.id,
      title: page.properties.Name?.title[0]?.plain_text || 'Untitled',
      slug: page.properties.Slug?.rich_text[0]?.plain_text || page.id,
      description: page.properties.Description?.rich_text[0]?.plain_text || '',
      date: page.properties.Date?.date?.start || page.created_time,
      category: page.properties.Category?.select?.name || '',
      results: page.properties.Results?.rich_text[0]?.plain_text || '',
    }));

    return res.status(200).json(posts);
  } catch (error) {
    console.error('Notion Direct Fetch Error:', error);
    return res.status(500).json({ 
      message: 'Error fetching studies via REST API',
      details: error.message || 'Unknown REST error'
    });
  }
}
