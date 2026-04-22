import { test } from './fixtures/basePage';
import { expect } from '@playwright/test';
import { WebEnv } from '../../framework-config/web-env';
import * as loginData from '../../testData/web/loginCredentials.json';

test.describe('SauceDemo Remove From Cart Scenarios', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateToPage(WebEnv.WEB_URL);
    });

    test('TC009: Add products, count cart, remove products, and count again', async ({ loginPage, productsPage, cartPage }) => {
        console.log('Test Started: Add products, count cart, remove products, and count again...');
        
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
        
        // Step 7: Remove Sauce Labs Backpack from cart
        const backpackRemoved = await cartPage.removeProductFromCartByName('Sauce Labs Backpack');
        expect(backpackRemoved).toBeTruthy();
        console.log('Removed Sauce Labs Backpack from cart');
        
        // Wait for removal to complete
        await productsPage.page.waitForTimeout(1000);
        
        // Step 8: Count cart icon product count after first removal
        const cartIconCount2 = await productsPage.getCartIconCount();
        console.log(`Cart icon count after first removal: ${cartIconCount2}`);
        expect(cartIconCount2).toBe(1);
        
        // Step 9: Count list count after first removal
        const cartListCount2 = await cartPage.getCartItemCount();
        console.log(`Cart list count after first removal: ${cartListCount2}`);
        expect(cartListCount2).toBe(1);
        
        // Validate cart icon count matches list count
        expect(cartIconCount2).toBe(cartListCount2);
        console.log('Cart icon count matches list count after first removal');
        
        // Step 10: Remove Sauce Labs Bike Light from cart
        const bikeLightRemoved = await cartPage.removeProductFromCartByName('Sauce Labs Bike Light');
        expect(bikeLightRemoved).toBeTruthy();
        console.log('Removed Sauce Labs Bike Light from cart');
        
        // Wait for removal to complete
        await productsPage.page.waitForTimeout(1000);
        
        // Step 11: Count cart icon product count after second removal
        const cartIconCount3 = await productsPage.getCartIconCount();
        console.log(`Cart icon count after second removal: ${cartIconCount3}`);
        expect(cartIconCount3).toBe(0);
        
        // Step 12: Count list count after second removal
        const cartListCount3 = await cartPage.getCartItemCount();
        console.log(`Cart list count after second removal: ${cartListCount3}`);
        expect(cartListCount3).toBe(0);
        
        // Validate cart icon count matches list count
        expect(cartIconCount3).toBe(cartListCount3);
        console.log('Cart icon count matches list count after second removal');
        
        console.log('Test Completed: Remove from cart scenario successful');
    });
});
