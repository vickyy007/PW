const { test , expect } = require('@playwright/test')

test ('get the 3rd footer link from wikipedia page' , async ({page}) => {

        await page.goto('https://wikipedia.com');

        const footerlinks = page.locator('//a[@class="other-project-link"]');

        const linkcount = await footerlinks.count();

        await footerlinks.nth(2).click();


})