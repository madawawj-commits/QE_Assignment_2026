import { test } from './fixtures/basePage';
import { expect } from '@playwright/test';
import { WebEnv } from '../../framework-config/web-env';
import * as loginData from '../../testData/web/loginCredentials.json';

test.describe('SauceDemo Product View Scenarios', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateToPage(WebEnv.WEB_URL);
    });

    test('TC007: Click on Sauce Labs Backpack and verify title', async ({ loginPage, productsPage }) => {
        console.log('Test Started: Click on Sauce Labs Backpack and verify title...');
        
        // Step 1: Login to the web application
        await loginPage.userLogin(loginData.validCredentials.username, loginData.validCredentials.password);
        console.log('Logged in successfully');
        
        // Step 2: Click on the product (Sauce Labs Backpack)
        const productClicked = await productsPage.clickProductByName('Sauce Labs Backpack');
        expect(productClicked).toBeTruthy();
        console.log('Clicked on Sauce Labs Backpack');
        
        // Step 3: Validate the title of the opened product
        const productDetailTitle = await productsPage.getProductDetailTitle();
        console.log(`Product Detail Page Title: ${productDetailTitle}`);
        expect(productDetailTitle).toContain('Sauce Labs Backpack');
        
        console.log('Test Completed: Sauce Labs Backpack title verified successfully');
    });
});
