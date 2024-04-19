const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    await page.setViewport({width:1080 , height:1024 });
    const searchResultSelector = '.DocSearch-Button';
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);
    await page.waitForSelector('.DocSearch-Input'); 
    await page.type('.DocSearch-Input', 'chipi chipi chapa chapa', {delay: 100});
    await page.waitForSelector('#docsearch-item-5');
    await page.click('#docsearch-item-5');
    const titleSelector = await page.waitForSelector('h1');
    const fullTitle = await titleSelector?.evaluate(el => el.textContent);
    console.log(fullTitle);

    // Close the browser
    await browser.close();
})();
