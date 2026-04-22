import { test as base } from '@playwright/test';
import LoginPage from '../../../pageObjects/pages/login.page';
import LogoutPage from '../../../pageObjects/pages/logout.page';
import ProductsPage from '../../../pageObjects/pages/products.page';
import CartPage from '../../../pageObjects/pages/cart.page';

export const test = base.extend<{ loginPage: LoginPage; logoutPage: LogoutPage; productsPage: ProductsPage; cartPage: CartPage }>(
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
        cartPage: async ({ page }, use) => {
            await use(new CartPage(page))
        },
    }
)