// tools/llmPostProcessor.js
import { gemini } from './gemini.js';

export async function queryFormator(query, country) {
  console.log("*********** In queryFormator ***********");
  const searchPrompt = `Convert this product query into a shopping search query for Google Shopping specifically for ${country} which return diffrenct websites and its prices,
  Query: ${query}
  Just return the query, no other text or explanation.`;

  try {
    const generatedQuery = await gemini.generateText(searchPrompt);
    console.log("Gemini Genrated Query: ", generatedQuery);
    return generatedQuery;
  } catch (err) {
    console.log("*********** Error In queryFormator ***********", err.message);
    return `${query} In ${country}`
  }
}
