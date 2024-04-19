const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://pptr.dev/webdriver-bidi/#measuring-progress');
    await page.waitForSelector('.DocSearch-Button-Placeholder'); 
    await page.click('.DocSearch-Button-Placeholder'); 
    await page.waitForSelector('.DocSearch-Input'); 
    await page.type('.DocSearch-Input', 'chipi chipi chapa chapa'); //input
    await page.waitForSelector('.DocSearch-Hits')
    await page.waitForFunction(() => {
        const hit = Array.from(document.querySelectorAll('.DocSearch-Hit-title')).find(e => e.textContent.includes('To gauge the capabilities of'));
        return hit && hit.closest('.DocSearch-Hit-Container');
    });
    await page.evaluate(() => {
        const hit = Array.from(document.querySelectorAll('.DocSearch-Hit-title')).find(e => e.textContent.includes('To gauge the capabilities of'));
        hit && hit.closest('.DocSearch-Hit-Container').click();
    });
    await page.waitForSelector('h1', { visible: true });
    const headerText = await page.$eval('h1', element => element.textContent);
    console.log(headerText);  
    await browser.close();
})();
