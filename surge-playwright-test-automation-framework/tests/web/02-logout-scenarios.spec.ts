import { test } from './fixtures/basePage';
import { expect } from '@playwright/test';
import { WebEnv } from '../../framework-config/web-env';
import * as loginData from '../../testData/web/loginCredentials.json';

test.describe('SauceDemo Logout Scenarios', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateToPage(WebEnv.WEB_URL);
    });

    test('TC006: Login then logout', async ({ loginPage, logoutPage }) => {
        console.log('Test Started: Login and logout scenario...');
        
        // Login with valid credentials
        await loginPage.userLogin(loginData.validCredentials.username, loginData.validCredentials.password);
        
        // Verify successful login by checking if error message is not displayed
        expect(await loginPage.isErrorMessageDisplayed()).toBeFalsy();
        
        // Perform logout
        await logoutPage.performLogout();
        
        // Wait for logout to complete
        await logoutPage.page.waitForTimeout(2000);
        
        // Verify we're back on login page after logout
        expect(await logoutPage.isOnLoginPage()).toBeTruthy();
        
        console.log('Test Completed: Logout successful');
    });
});
