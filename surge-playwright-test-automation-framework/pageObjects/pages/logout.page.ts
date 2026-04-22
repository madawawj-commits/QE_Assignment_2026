import { Page } from "@playwright/test";

export default class LogoutPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /*
    LOCATORS
        Locators of Logout Page
    */
    burgerMenuBtn = () => this.page.locator('#react-burger-menu-btn'); // burger menu button
    logoutLink = () => this.page.getByText('Logout'); // logout link
    txtUsername = () => this.page.locator('[data-test="username"]'); // username field (to verify back on login page)
    
    // Alternative locators for better reliability
    burgerMenu = () => this.page.locator('.bm-burger-menu-button'); // alternative burger menu
    logoutButton = () => this.page.locator('#logout_sidebar_link'); // logout sidebar link

    /*
    ACTIONS
        actions performs inside the class
    */

    //perform logout from the application
    public async performLogout() {
        // Simple logout approach with proper timeouts
        try {
            // Click burger menu
            await this.burgerMenuBtn().click({ timeout: 5000 });
            
            // Wait for menu to open
            await this.page.waitForTimeout(1000);
            
            // Click logout link
            await this.logoutLink().click({ timeout: 5000 });
            
            console.log("User logged out successfully");
        } catch (error) {
            console.log("Logout failed with primary approach, trying fallback");
            
            // Fallback: Try alternative locators
            try {
                await this.burgerMenu().click({ timeout: 3000 });
                await this.page.waitForTimeout(500);
                await this.logoutButton().click({ timeout: 3000 });
                console.log("User logged out successfully using fallback");
            } catch (fallbackError) {
                console.log("Logout failed with fallback approach");
                throw new Error("Logout failed: " + error);
            }
        }
    }

    //verify if we're back on login page after logout
    public async isOnLoginPage(): Promise<boolean> {
        return await this.txtUsername().isVisible();
    }
}
