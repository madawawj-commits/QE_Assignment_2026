import { test } from './fixtures/basePage';
import { expect } from '@playwright/test';
import { WebEnv } from '../../framework-config/web-env';
import * as loginData from '../../testData/web/loginCredentials.json';

test.describe('SauceDemo Login Scenarios', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateToPage(WebEnv.WEB_URL);
    });

    test('TC001: Valid username and valid password - Successful login', async ({ loginPage, productsPage }) => {
        console.log('Test Started: Valid credentials login...');
        
        await loginPage.userLogin(loginData.validCredentials.username, loginData.validCredentials.password);
        
        // Verify successful login - products page should be visible
        expect(await productsPage.productsIsVisible()).toBeTruthy();
        
        console.log('Test Completed: Valid credentials login successful');
    });

    test('TC002: Valid username and invalid password - Failed login', async ({ loginPage }) => {
        console.log('Test Started: Valid username with invalid password...');
        
        await loginPage.userLogin(loginData.validCredentials.username, loginData.invalidCredentials.wrongPassword);
        
        // Verify error message is displayed
        expect(await loginPage.isErrorMessageDisplayed()).toBeTruthy();
        
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain(loginData.errorMessages.credentialsMismatch);
        
        console.log('Test Completed: Invalid password error verified');
    });

    test('TC003: Invalid username and valid password - Failed login', async ({ loginPage }) => {
        console.log('Test Started: Invalid username with valid password...');
        
        await loginPage.userLogin(loginData.invalidCredentials.wrongUsername, loginData.validCredentials.password);
        
        // Verify error message is displayed
        expect(await loginPage.isErrorMessageDisplayed()).toBeTruthy();
        
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain(loginData.errorMessages.credentialsMismatch);
        
        console.log('Test Completed: Invalid username error verified');
    });

    test('TC004: Invalid username and invalid password - Failed login', async ({ loginPage }) => {
        console.log('Test Started: Invalid username and invalid password...');
        
        await loginPage.userLogin(loginData.invalidCredentials.wrongUsername, loginData.invalidCredentials.wrongPassword);
        
        // Verify error message is displayed
        expect(await loginPage.isErrorMessageDisplayed()).toBeTruthy();
        
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain(loginData.errorMessages.credentialsMismatch);
        
        console.log('Test Completed: Invalid credentials error verified');
    });

    test('TC005: Empty username and password - Failed login', async ({ loginPage }) => {
        console.log('Test Started: Empty username and password...');
        
        await loginPage.userLogin(loginData.invalidCredentials.emptyUsername, loginData.invalidCredentials.emptyPassword);
        
        // Verify error message is displayed
        expect(await loginPage.isErrorMessageDisplayed()).toBeTruthy();
        
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain(loginData.errorMessages.usernameRequired);
        
        console.log('Test Completed: Empty credentials error verified');
    });
});
