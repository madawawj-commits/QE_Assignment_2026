import { test } from './fixtures/basePage';
import { expect } from '@playwright/test';
import { WebEnv } from '../../framework-config/web-env';
import * as loginData from '../../testData/web/loginCredentials.json';
import * as checkoutData from '../../testData/web/checkoutCredentials.json';

test.describe('SauceDemo Checkout Scenarios', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateToPage(WebEnv.WEB_URL);
    });

    test('TC010: Complete checkout flow with validation', async ({ loginPage, productsPage, cartPage, checkoutPage, logoutPage }) => {
        console.log('Test Started: Complete checkout flow with validation...');
        
        // Step 1: Login to the web application
        await loginPage.userLogin(loginData.validCredentials.username, loginData.validCredentials.password);
        console.log('Logged in successfully');
        
        // Step 2: Add Sauce Labs Backpack to cart
        const backpackAdded = await productsPage.addProductToCartByName('Sauce Labs Backpack');
        expect(backpackAdded).toBeTruthy();
        console.log('Added Sauce Labs Backpack to cart');
        
        // Step 3: Add Sauce Labs Bike Light to cart
        const bikeLightAdded = await productsPage.addProductToCartByName('Sauce Labs Bike Light');
        expect(bikeLightAdded).toBeTruthy();
        console.log('Added Sauce Labs Bike Light to cart');
        
        // Step 4: Count cart icon product count
        const cartIconCount1 = await productsPage.getCartIconCount();
        console.log(`Cart icon count after adding products: ${cartIconCount1}`);
        expect(cartIconCount1).toBe(2);
        
        // Step 5: Click cart icon
        await productsPage.clickCartIcon();
        console.log('Clicked cart icon');
        
        // Step 6: Count list count (cart item count)
        const cartListCount1 = await cartPage.getCartItemCount();
        console.log(`Cart list count after adding products: ${cartListCount1}`);
        expect(cartListCount1).toBe(2);
        
        // Validate cart icon count matches list count
        expect(cartIconCount1).toBe(cartListCount1);
        console.log('Cart icon count matches list count');
        
        // Step 7: Click checkout button
        await cartPage.clickCheckout();
        console.log('Clicked checkout button');
        
        // Step 8: Fill checkout information from data file
        await checkoutPage.fillCheckoutInformation(
            checkoutData.checkoutInfo.firstName,
            checkoutData.checkoutInfo.lastName,
            checkoutData.checkoutInfo.zipCode
        );
        console.log('Filled checkout information from data file');
        
        // Step 9: Click continue button
        await checkoutPage.clickContinue();
        console.log('Clicked continue button');
        
        // Step 10: Get item prices from checkout overview
        const item1Price = await checkoutPage.getCartItemPriceByIndex(0);
        const item2Price = await checkoutPage.getCartItemPriceByIndex(1);
        console.log(`Item 1 Price: ${item1Price}`);
        console.log(`Item 2 Price: ${item2Price}`);
        
        // Step 11: Calculate expected item total
        const price1 = checkoutPage.extractPriceValue(item1Price);
        const price2 = checkoutPage.extractPriceValue(item2Price);
        const expectedItemTotal = price1 + price2;
        console.log(`Expected Item Total: $${expectedItemTotal.toFixed(2)}`);
        
        // Step 12: Get and validate subtotal from page
        const subTotalString = await checkoutPage.getSubTotal();
        const actualSubTotal = checkoutPage.extractPriceValue(subTotalString);
        console.log(`Actual Subtotal: ${subTotalString}`);
        expect(actualSubTotal).toBeCloseTo(expectedItemTotal, 2);
        console.log('Subtotal validated against item prices');
        
        // Step 13: Get and validate tax amount (8%)
        const taxString = await checkoutPage.getTax();
        const actualTax = checkoutPage.extractPriceValue(taxString);
        const expectedTax = checkoutPage.calculateTotalWithTax(expectedItemTotal, checkoutData.taxPercentage) - expectedItemTotal;
        console.log(`Actual Tax: ${taxString}`);
        console.log(`Expected Tax: $${expectedTax.toFixed(2)}`);
        expect(actualTax).toBeCloseTo(expectedTax, 2);
        console.log('Tax validated at 8%');
        
        // Step 14: Get and validate total amount
        const totalString = await checkoutPage.getTotal();
        const actualTotal = checkoutPage.extractPriceValue(totalString);
        const expectedTotal = checkoutPage.calculateTotalWithTax(expectedItemTotal, checkoutData.taxPercentage);
        console.log(`Actual Total: ${totalString}`);
        console.log(`Expected Total: $${expectedTotal.toFixed(2)}`);
        expect(actualTotal).toBeCloseTo(expectedTotal, 2);
        console.log('Total validated');
        
        // Step 15: Click finish button
        await checkoutPage.clickFinish();
        console.log('Clicked finish button');
        
        // Step 16: Get cart icon count after checkout
        const cartIconCount2 = await productsPage.getCartIconCount();
        console.log(`Cart icon count after checkout: ${cartIconCount2}`);
        expect(cartIconCount2).toBe(0);
        
        // Step 17: Validate success messages
        const completeHeader = await checkoutPage.getCompleteHeader();
        const completeText = await checkoutPage.getCompleteText();
        console.log(`Complete Header: ${completeHeader}`);
        console.log(`Complete Text: ${completeText}`);
        
        expect(completeHeader).toContain(checkoutData.successMessages.thankYouMessage);
        console.log('Thank you message validated');
        
        expect(completeText).toContain(checkoutData.successMessages.orderDispatchedMessage);
        console.log('Order dispatched message validated');
        
        // Step 18: Click back home button
        await checkoutPage.clickBackHome();
        console.log('Clicked back home button');
        
        // Step 19: Logout from the application
        await logoutPage.performLogout();
        console.log('Logged out from the application');
        
        console.log('Test Completed: Checkout flow successful');
    });
});
