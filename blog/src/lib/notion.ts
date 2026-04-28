import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

// Ensure you set these environment variables in .env.local
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getPublishedPosts = async () => {
  if (!process.env.NOTION_DATABASE_ID) return [];
  
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

    return response.results.map((page: any) => {
      return {
        id: page.id,
        title: page.properties.Name?.title[0]?.plain_text || 'Untitled',
        slug: page.properties.Slug?.rich_text[0]?.plain_text || page.id,
        description: page.properties.Description?.rich_text[0]?.plain_text || '',
        date: page.properties.Date?.date?.start || page.created_time,
      };
    });
  } catch (error) {
    console.error("Error fetching Notion posts:", error);
    return [];
  }
};

export const getSinglePost = async (slug: string) => {
  if (!process.env.NOTION_DATABASE_ID) return null;

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: 'Slug',
        rich_text: {
          equals: slug,
        },
      },
    });

    if (!response.results[0]) {
      return null;
    }

    const page = response.results[0] as any;
    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const markdown = n2m.toMarkdownString(mdBlocks);

    return {
      metadata: {
        id: page.id,
        title: page.properties.Name?.title[0]?.plain_text || 'Untitled',
        description: page.properties.Description?.rich_text[0]?.plain_text || '',
        date: page.properties.Date?.date?.start || page.created_time,
      },
      markdown: markdown.parent || markdown,
    };
  } catch (error) {
    console.error("Error fetching single Notion post:", error);
    return null;
  }
};
