import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

async function listModels() {
  try {
    const models = await ai.models.list();
    console.log('Available models:', JSON.stringify(models, null, 2));
  } catch (error) {
    console.error('Error listing models:', error);
  }
}

listModels();
