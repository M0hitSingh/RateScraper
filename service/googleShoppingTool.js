import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

export async function searchGoogleShopping(query, country, browser) {
  console.log("*********** Searching Google Shopping ***********");
  const url = `https://www.google.com/search?tbm=shop&q=${query}`;
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded'});

    const productResponse = await page.evaluate(() => {
      const containers = document.querySelectorAll(
        '.gkQHve, .n7emVc, .FG68Ac, .sh-dgr__grid-result, .sh-dlr__list-result, [data-docid]'
      );
      return Array.from(containers).map(div => div.innerText.trim());
    });

    return productResponse;
  } catch (err) {
    console.log("*********** Error in Searching Google Shopping ***********", err.message);
    return [];
  } finally {
    await page.close();
  }
}