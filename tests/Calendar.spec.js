const { test, expect } = require('@playwright/test');

test('@Handling calendar', async ({ page }) => {

    const month = "June";
    const year = 2028;
    const date = 15;

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.getByText(month).click();
    await page.locator("//abbr[text()='"+date+"']").click();

})