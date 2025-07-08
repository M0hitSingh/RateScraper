import express from 'express';
import dotenv from 'dotenv';
import { searchGoogleShopping } from './service/googleShoppingTool.js';
import { matchAndFilterProducts } from './tools/llmPostProcessor.js';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { queryFormator } from './tools/llmPreProcessor.js';

puppeteer.use(StealthPlugin());
dotenv.config();

const app = express();
app.use(express.json());
let browser; 

app.post('/api/search', async (req, res) => {
  const { country, query } = req.body;
  if (!country || !query) return res.status(400).json({ error: 'Missing country or query' });

  try {
    // Step 1: Call PreProcessor to genrate search query 
    const generatedQuery = await queryFormator(query, country);

    // Step 2: Use tool to search on web
    const rawResults = await searchGoogleShopping(generatedQuery, country, browser);

    // Step 3: Post process the results
    const postProcessedResults = await matchAndFilterProducts(query, rawResults);

    res.json(postProcessedResults);
  } catch (err) {
    console.error("*********** Error In Post /api/search ***********", err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const startServer = async () => {
  browser = await puppeteer.launch({
    headless: true, 
    userDataDir: './.tmp-user-profile'
  });
  console.log('🧠 Browser launched.');
  app.listen(3000, () => console.log('🚀 MCP Shopping Server running on port 3000'));
};

startServer();
