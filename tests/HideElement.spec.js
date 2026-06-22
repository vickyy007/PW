const { test, expect } = require('@playwright/test');

test('@Hide and show element validation', async ({ page }) => {


    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect (page.locator("#displayed-text")).toBeVisible();
    await expect (page.locator("#hide-textbox")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect (page.locator("#displayed-text")).toBeHidden();

    // handling alerts/pop-ups 
    await page.on('dialog',dialog=> dialog.accept());
    await page.locator(".btn-style").nth(0).click();

    //handling hover
    await page.pause();
    await page.locator('#mousehover').hover();









})