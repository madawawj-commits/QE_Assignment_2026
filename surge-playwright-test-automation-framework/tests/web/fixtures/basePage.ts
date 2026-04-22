import { test as base } from '@playwright/test';
import LoginPage from '../../../pageObjects/pages/login.page';
import LogoutPage from '../../../pageObjects/pages/logout.page';
import ProductsPage from '../../../pageObjects/pages/products.page';

export const test = base.extend<{ loginPage: LoginPage; logoutPage: LogoutPage; productsPage: ProductsPage }>(
    {
        //Define fixture
        loginPage: async ({ page }, use) => {
            await use(new LoginPage(page))
        },
        logoutPage: async ({ page }, use) => {
            await use(new LogoutPage(page))
        },
        productsPage: async ({ page }, use) => {
            await use(new ProductsPage(page))
        },
    }
)