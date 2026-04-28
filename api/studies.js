import { Client } from '@notionhq/client';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
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
    });

    const posts = response.results.map((page) => ({
      id: page.id,
      title: page.properties.Name?.title[0]?.plain_text || 'Untitled',
      slug: page.properties.Slug?.rich_text[0]?.plain_text || page.id,
      description: page.properties.Description?.rich_text[0]?.plain_text || '',
      date: page.properties.Date?.date?.start || page.created_time,
    }));

    return res.status(200).json(posts);
  } catch (error) {
    console.error('Notion API Error:', error);
    return res.status(500).json({ message: 'Error fetching studies' });
  }
}
