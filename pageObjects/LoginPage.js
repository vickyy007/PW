class LoginPage {


    constructor(page){
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signInButton = page.locator("[value = 'Login']");
    }

    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username , password){
        await this.userName.type(username);
        await this.password.type(password);
        await this.signInButton.click();
        await page.waitForLoadState('networkidle');
    }
}

module.exports = {LoginPage};
