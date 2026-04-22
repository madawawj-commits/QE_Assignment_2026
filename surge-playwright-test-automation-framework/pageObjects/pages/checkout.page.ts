import { Page } from "@playwright/test";

export default class CheckoutPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /*
    LOCATORS
        Locators of Checkout Page
    */
    checkoutTitle = () => this.page.locator('.title'); // checkout page title
    firstNameInput = () => this.page.locator('[data-test="firstName"]'); // first name input
    lastNameInput = () => this.page.locator('[data-test="lastName"]'); // last name input
    zipCodeInput = () => this.page.locator('[data-test="postalCode"]'); // zip code input
    continueButton = () => this.page.locator('[data-test="continue"]'); // continue button
    cancelButton = () => this.page.locator('[data-test="cancel"]'); // cancel button

    // Checkout overview page locators
    checkoutOverviewTitle = () => this.page.locator('.title'); // checkout overview title
    cartItems = () => this.page.locator('.cart_item'); // cart items
    cartItemNames = () => this.page.locator('.inventory_item_name'); // cart item names
    cartItemPrices = () => this.page.locator('.inventory_item_price'); // cart item prices
    subTotalLabel = () => this.page.locator('.summary_subtotal_label'); // subtotal label
    taxLabel = () => this.page.locator('.summary_tax_label'); // tax label
    totalLabel = () => this.page.locator('.summary_total_label'); // total label
    finishButton = () => this.page.locator('[data-test="finish"]'); // finish button
    cancelButtonOverview = () => this.page.locator('[data-test="cancel"]'); // cancel button on overview

    // Checkout complete page locators
    completeHeader = () => this.page.locator('.complete-header'); // complete header
    completeText = () => this.page.locator('.complete-text'); // complete text
    backHomeButton = () => this.page.locator('[data-test="back-to-products"]'); // back home button

    /*
    ACTIONS
        actions performs inside the class
    */

    //fill checkout information
    public async fillCheckoutInformation(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameInput().fill(firstName);
        await this.lastNameInput().fill(lastName);
        await this.zipCodeInput().fill(zipCode);
        console.log(`Filled checkout information: ${firstName} ${lastName} ${zipCode}`);
    }

    //click continue button
    public async clickContinue() {
        await this.continueButton().click();
        console.log('Clicked continue button');
    }

    //click cancel button
    public async clickCancel() {
        await this.cancelButton().click();
        console.log('Clicked cancel button');
    }

    //get checkout page title
    public async getCheckoutTitle(): Promise<string> {
        const titleElement = this.checkoutTitle();
        await titleElement.waitFor({ state: 'visible', timeout: 5000 });
        return await titleElement.textContent() || '';
    }

    //get subtotal amount
    public async getSubTotal(): Promise<string> {
        const subTotalElement = this.subTotalLabel();
        await subTotalElement.waitFor({ state: 'visible', timeout: 5000 });
        return await subTotalElement.textContent() || '';
    }

    //get tax amount
    public async getTax(): Promise<string> {
        const taxElement = this.taxLabel();
        await taxElement.waitFor({ state: 'visible', timeout: 5000 });
        return await taxElement.textContent() || '';
    }

    //get total amount
    public async getTotal(): Promise<string> {
        const totalElement = this.totalLabel();
        await totalElement.waitFor({ state: 'visible', timeout: 5000 });
        return await totalElement.textContent() || '';
    }

    //get cart item count on overview page
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

    //click finish button
    public async clickFinish() {
        await this.finishButton().click();
        console.log('Clicked finish button');
    }

    //get complete header text
    public async getCompleteHeader(): Promise<string> {
        const headerElement = this.completeHeader();
        await headerElement.waitFor({ state: 'visible', timeout: 5000 });
        return await headerElement.textContent() || '';
    }

    //get complete text
    public async getCompleteText(): Promise<string> {
        const textElement = this.completeText();
        await textElement.waitFor({ state: 'visible', timeout: 5000 });
        return await textElement.textContent() || '';
    }

    //click back home button
    public async clickBackHome() {
        await this.backHomeButton().click();
        console.log('Clicked back home button');
    }

    //extract price value from price string (e.g., "$29.99" -> 29.99)
    public extractPriceValue(priceString: string): number {
        const match = priceString.match(/\$?(\d+\.?\d*)/);
        return match ? parseFloat(match[1]) : 0;
    }

    //calculate total with tax
    public calculateTotalWithTax(subTotal: number, taxPercentage: number): number {
        const taxAmount = (subTotal * taxPercentage) / 100;
        return subTotal + taxAmount;
    }
}
