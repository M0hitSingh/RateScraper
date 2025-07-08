import { gemini } from './gemini.js';

export async function matchAndFilterProducts(query, products) {
  console.log("*********** In matchAndFilterProducts ***********");
  const prompt = `
You are a smart shopping assistant. After searching for the query: ${query} 
- I got a flat array of products detail
- Given a flat array of products detail, you have to split them into
- {price, currency, productName, specs, seller, link} and make array of these object
- if any thing is missing, make it NA value for that field
- only return the array of object in JSON so that I can parse this, no need to return any other text or explanation


Here are the raw product listings: ${products.slice(0,60)}`

  try {
    let responce = await gemini.generateText(prompt);
    const result = responce.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```/g, '')  
    console.log(result)
    return JSON.parse(result);
  } catch (err) {
    console.log("*********** Error In matchAndFilterProducts ***********", err.message);
    console.info('----------- Filtering Manualy -----------')
    const productList = [];
    for(let i = 0; i < products.length; i+=3){
      productList.push({
        "productName": products[i],
        "price": products[i+1],
        "seller": products[i+2],
      })
    }
    return productList;
  }
}
