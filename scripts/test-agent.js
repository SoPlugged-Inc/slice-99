import handler from '../api/growth-agent.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Mock request and response
const req = {
  headers: {
    get: (name) => {
      if (name === 'authorization') return 'Bearer local-test';
      return null;
    }
  }
};

const res = {
  status: (code) => ({
    json: (data) => {
      console.log(`Status: ${code}`);
      console.log('Response:', JSON.stringify(data, null, 2));
    }
  })
};

// Set local test secret if not present
process.env.CRON_SECRET = 'local-test';
process.env.NODE_ENV = 'development';

console.log('Running local test of Vercel API agent...');
handler(req, res);
