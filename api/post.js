import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Post ID is required' });
  }

  const { NOTION_API_KEY } = process.env;

  if (!NOTION_API_KEY) {
    return res.status(500).json({ message: 'Notion API key missing' });
  }

  const notion = new Client({ auth: NOTION_API_KEY });
  const n2m = new NotionToMarkdown({ notionClient: notion });

  try {
    // 1. Fetch metadata to get title etc.
    const page = await notion.pages.retrieve({ page_id: id });
    
    // 2. Convert page blocks to markdown
    const mdblocks = await n2m.pageToMarkdown(id);
    const mdString = n2m.toMarkdownString(mdblocks);

    const post = {
      title: page.properties.Name?.title[0]?.plain_text || 'Untitled',
      content: mdString.parent || mdString,
      date: page.created_time
    };

    return res.status(200).json(post);
  } catch (error) {
    console.error('Notion Post Fetch Error:', error);
    return res.status(500).json({ 
      message: 'Error fetching post content',
      details: error.message 
    });
  }
}
