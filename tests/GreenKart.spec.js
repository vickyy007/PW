const { test , expect } = require('@playwright/test');

test('green kart playwright automation', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");

   const productNames = page.locator("h4.product-name");
   const totalCount = await productNames.count();

   const productsNeeded = ["Carrot", "Beetroot"];

for (let i = 0; i < totalCount; i++) {

    const productName = await productNames.nth(i).textContent();
    const formattedName = productName.split("-")[0].trim();

    if (productsNeeded.includes(formattedName)) {
        await page.locator(".product").nth(i).locator("button").click();
    }
}

await page.locator('.cart-icon').click();
const CheckoutButton = page.locator('.cart-preview');
await CheckoutButton.getByRole('button').click();

//await page.pause();

const CartValue = await page.locator('.discountAmt').textContent();
console.log(CartValue);

await page.getByText('Place Order').click();
await page.locator('select:visible').pressSequentially("in" , {delay:150});
await page.locator('select:visible').press('Enter');
await page.getByRole('checkbox').click();
await page.getByText('Proceed').click();
});