import { Page } from "@playwright/test";

export default class LoginPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async navigateToPage(url: string) {
        await this.page.goto(url, { waitUntil: "domcontentloaded" });
        console.log(`Navigate to: `);
    }

    /*
    LOCATORS
        Locators of Login Page
    */
    txtUsername = () => this.page.locator('[data-test="username"]'); // username field
    pwdPassword = () => this.page.locator('[data-test="password"]'); //password field
    btnSignIn = () => this.page.getByRole('button', { name: 'LOGIN' }); //sign in button
    errorMessage = () => this.page.locator('[data-test="error"]'); // error message container

    /*
    ACTIONS
        actions perfoms inside the class
    */

    //user login using given credentials
    public async userLogin(username: string, password: string) {
        await this.txtUsername().fill(username);
        await this.pwdPassword().fill(password);
        await this.btnSignIn().click();
        console.log("Login using: " + username + " username");
    }

    //get error message text
    public async getErrorMessage(): Promise<string> {
        const errorElement = this.errorMessage();
        await errorElement.waitFor({ state: 'visible', timeout: 5000 });
        return await errorElement.textContent() || '';
    }

    //check if error message is displayed
    public async isErrorMessageDisplayed(): Promise<boolean> {
        return await this.errorMessage().isVisible();
    }
}
