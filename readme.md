# Price Fetcher API
 A lightweight Node.js-based API to **fetch product prices** from various websites based on product name and shopper's country.

###  Features
- **Search by Product & Country** 
- **Used LLM (Gemini APi)** for Pre and Post Processing and handle the fallback cases
- **Pluggable Tool** Designed to support multiple tools like Pupeteer, LLM API's  
---

## 🔗 Hosted API Endpoint

**Search API curl**

```bash
curl -X POST http://3.110.117.51/api/search \
  -H "Content-Type: application/json" \
  -d '{
    "product": "iPhone 16 Pro",
    "country": "IN"
  }'


