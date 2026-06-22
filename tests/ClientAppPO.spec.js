const { test, expect } = require('@playwright/test');
const {LoginPage} = require('../pageObjects/LoginPage');
const {DashboardPage} = require('../pageObjects/DashboardPage');
const dataset = JSON.parse(JSON.stringify(require('../DataDriven/PlaceOrderTestData.json')));

for (const data of dataset){

test(`Client App login page object for ${data.productName} ` , async ({ page }) => {
   //js file- Login js, DashboardPage
   
   const products = page.locator(".card-body");

   const loginPage = new LoginPage(page);

   await loginPage.goTo();
   await loginPage.validLogin(data.username , data.password)

   const dashboardPage = new DashboardPage(page);

   await dashboardPage.searchProducts(data.productName);
   
   await page.locator(".card-body b").first().waitFor();

   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
    
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === data.productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }


   // click on cart and assert on the product in cart

   await dashboardPage.navigateToCart();
   
   //await page.pause();

   await page.locator("div li").first().waitFor();
   //const bool = await page.locator(`h3:has-text(data.productName)`).isVisible();
   const bool = await page.locator(`h3:has-text('${data.productName}')`).isVisible();
   expect(bool).toBeTruthy();

   //click on Checkout and select country from dropdown and place the order
   await page.locator("text=Checkout").click();

   await page.locator("[placeholder*='Country']").pressSequentially("ind" , {delay:150});
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();

   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }


   //print order id and assert on order history.
   expect(page.locator(".user__name [type='text']").first()).toHaveText(data.username);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);


   // print all the order id's from my orders page and assert on the order id from the previous page.
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");


   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

});

}








