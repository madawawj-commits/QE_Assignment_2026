import { test } from '../web/fixtures/basePage';
import { expect } from '@playwright/test';
import { WebEnv } from '../../framework-config/web-env';


test(`Login test`, async ({ loginPage, productsPage }) => {
    console.log("Test Started...");
    await loginPage.navigateToPage(WebEnv.WEB_URL);
    await loginPage.userLogin(WebEnv.WEB_USERNAME, WebEnv.WEB_PASSWORD);
    expect(await productsPage.productsIsVisible()).toBeTruthy();
    console.log("Test Completed...");
})