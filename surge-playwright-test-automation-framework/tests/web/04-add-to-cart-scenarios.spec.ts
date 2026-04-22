import { test } from './fixtures/basePage';
import { expect } from '@playwright/test';
import { WebEnv } from '../../framework-config/web-env';
import * as loginData from '../../testData/web/loginCredentials.json';

test.describe('SauceDemo Add to Cart Scenarios', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateToPage(WebEnv.WEB_URL);
    });

    test('TC008: Add products to cart and validate', async ({ loginPage, productsPage, cartPage }) => {
        console.log('Test Started: Add products to cart and validate...');
        
        // Step 1: Login to the web application
        await loginPage.userLogin(loginData.validCredentials.username, loginData.validCredentials.password);
        console.log('Logged in successfully');
        
        // Step 2: Add Sauce Labs Backpack to cart
        const backpackAdded = await productsPage.addProductToCartByName('Sauce Labs Backpack');
        expect(backpackAdded).toBeTruthy();
        console.log('Added Sauce Labs Backpack to cart');
        
        // Validate cart icon count after first product
        const cartIconCount1 = await productsPage.getCartIconCount();
        expect(cartIconCount1).toBe(1);
        console.log(`Cart icon count after first product: ${cartIconCount1}`);
        
        // Step 3: Click cart icon
        await productsPage.clickCartIcon();
        console.log('Clicked cart icon');
        
        // Step 4: Validate the product title in cart
        const isBackpackInCart = await cartPage.isProductInCart('Sauce Labs Backpack');
        expect(isBackpackInCart).toBeTruthy();
        console.log('Sauce Labs Backpack validated in cart');
        
        // Validate cart item count matches cart icon count
        const cartItemCount1 = await cartPage.getCartItemCount();
        expect(cartItemCount1).toBe(cartIconCount1);
        console.log(`Cart item count matches cart icon count: ${cartItemCount1}`);
        
        // Step 5: Click continue shopping
        await cartPage.clickContinueShopping();
        console.log('Clicked continue shopping');
        
        // Step 6: Add Sauce Labs Bike Light to cart
        const bikeLightAdded = await productsPage.addProductToCartByName('Sauce Labs Bike Light');
        expect(bikeLightAdded).toBeTruthy();
        console.log('Added Sauce Labs Bike Light to cart');
        
        // Validate cart icon count after second product
        const cartIconCount2 = await productsPage.getCartIconCount();
        expect(cartIconCount2).toBe(2);
        console.log(`Cart icon count after second product: ${cartIconCount2}`);
        
        // Step 7: Click cart icon
        await productsPage.clickCartIcon();
        console.log('Clicked cart icon');
        
        // Step 8: Validate the product title in cart
        const isBikeLightInCart = await cartPage.isProductInCart('Sauce Labs Bike Light');
        expect(isBikeLightInCart).toBeTruthy();
        console.log('Sauce Labs Bike Light validated in cart');
        
        // Step 9: Validate both products are in cart
        const cartItemCount2 = await cartPage.getCartItemCount();
        expect(cartItemCount2).toBe(2);
        console.log(`Total items in cart: ${cartItemCount2}`);
        
        // Validate cart item count matches cart icon count
        expect(cartItemCount2).toBe(cartIconCount2);
        console.log(`Cart item count matches cart icon count: ${cartItemCount2}`);
        
        console.log('Test Completed: Add to cart scenario successful');
    });
});
