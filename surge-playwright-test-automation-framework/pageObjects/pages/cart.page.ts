import { Page } from "@playwright/test";

export default class CartPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /*
    LOCATORS
        Locators of Cart Page
    */
    cartTitle = () => this.page.locator('.title'); // cart page title
    cartItems = () => this.page.locator('.cart_item'); // cart items
    cartItemNames = () => this.page.locator('.inventory_item_name'); // cart item names
    cartItemPrices = () => this.page.locator('.inventory_item_price'); // cart item prices
    cartItemQuantities = () => this.page.locator('.cart_quantity'); // cart item quantities
    continueShoppingButton = () => this.page.locator('#continue-shopping'); // continue shopping button
    checkoutButton = () => this.page.locator('#checkout'); // checkout button
    removeButtons = () => this.page.locator('.cart_button'); // remove buttons

    /*
    ACTIONS
        actions performs inside the class
    */

    //verify cart page is visible
    public async isCartPageVisible(): Promise<boolean> {
        return await this.cartTitle().isVisible();
    }

    //get cart page title
    public async getCartTitle(): Promise<string> {
        const titleElement = this.cartTitle();
        await titleElement.waitFor({ state: 'visible', timeout: 5000 });
        return await titleElement.textContent() || '';
    }

    //get number of items in cart
    public async getCartItemCount(): Promise<number> {
        const items = await this.cartItems().all();
        return items.length;
    }

    //get cart item name by index
    public async getCartItemNameByIndex(index: number): Promise<string> {
        const names = await this.cartItemNames().all();
        if (index < names.length) {
            return await names[index].textContent() || '';
        }
        return '';
    }

    //get cart item price by index
    public async getCartItemPriceByIndex(index: number): Promise<string> {
        const prices = await this.cartItemPrices().all();
        if (index < prices.length) {
            return await prices[index].textContent() || '';
        }
        return '';
    }

    //get cart item quantity by index
    public async getCartItemQuantityByIndex(index: number): Promise<string> {
        const quantities = await this.cartItemQuantities().all();
        if (index < quantities.length) {
            return await quantities[index].textContent() || '';
        }
        return '';
    }

    //verify product is in cart by name
    public async isProductInCart(productName: string): Promise<boolean> {
        const names = await this.cartItemNames().all();
        for (let i = 0; i < names.length; i++) {
            const name = await names[i].textContent();
            if (name && name.includes(productName)) {
                return true;
            }
        }
        return false;
    }

    //click continue shopping button
    public async clickContinueShopping() {
        await this.continueShoppingButton().click();
    }

    //click checkout button
    public async clickCheckout() {
        await this.checkoutButton().click();
    }

    //remove product from cart by name
    public async removeProductFromCartByName(productName: string) {
        const names = await this.cartItemNames().all();
        for (let i = 0; i < names.length; i++) {
            const name = await names[i].textContent();
            if (name && name.includes(productName)) {
                const removeButton = this.removeButtons().nth(i);
                await removeButton.click();
                return true;
            }
        }
        return false;
    }

    //remove all products from cart
    public async removeAllProductsFromCart() {
        const items = await this.cartItems().all();
        for (let i = 0; i < items.length; i++) {
            await this.removeButtons().first().click();
            await this.page.waitForTimeout(500);
        }
    }
}
