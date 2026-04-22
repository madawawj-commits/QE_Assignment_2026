import { Page } from "@playwright/test";

export default class ProductsPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /*
    LOCATORS
        Locators of Products Page
    */
    productsTitle = () => this.page.locator('.product_label'); // products title
    productItems = () => this.page.locator('.inventory_item'); // product items
    productNames = () => this.page.locator('.inventory_item_name'); // product names
    productPrices = () => this.page.locator('.inventory_item_price'); // product prices
    productDescriptions = () => this.page.locator('.inventory_item_desc'); // product descriptions
    addToCartButtons = () => this.page.locator('.btn_inventory'); // add to cart buttons
    productImage = () => this.page.locator('.inventory_item_img'); // product images

    /*
    ACTIONS
        actions performs inside the class
    */

    //verify products page is visible
    public async productsIsVisible(): Promise<boolean> {
        return await this.productsTitle().isVisible();
    }

    //get products page title
    public async getProductsTitle(): Promise<string> {
        const titleElement = this.productsTitle();
        await titleElement.waitFor({ state: 'visible', timeout: 5000 });
        return await titleElement.textContent() || '';
    }

    //get number of products available
    public async getProductCount(): Promise<number> {
        const items = await this.productItems().all();
        return items.length;
    }

    //get product name by index
    public async getProductNameByIndex(index: number): Promise<string> {
        const names = await this.productNames().all();
        if (index < names.length) {
            return await names[index].textContent() || '';
        }
        return '';
    }

    //get product price by index
    public async getProductPriceByIndex(index: number): Promise<string> {
        const prices = await this.productPrices().all();
        if (index < prices.length) {
            return await prices[index].textContent() || '';
        }
        return '';
    }

    //get product description by index
    public async getProductDescriptionByIndex(index: number): Promise<string> {
        const descriptions = await this.productDescriptions().all();
        if (index < descriptions.length) {
            return await descriptions[index].textContent() || '';
        }
        return '';
    }

    //click on product by index to view details
    public async clickProductByIndex(index: number) {
        const items = await this.productItems().all();
        if (index < items.length) {
            await items[index].click();
        }
    }

    //find and click product by name
    public async clickProductByName(productName: string) {
        const productNames = await this.productNames().all();
        for (let i = 0; i < productNames.length; i++) {
            const name = await productNames[i].textContent();
            if (name && name.includes(productName)) {
                await productNames[i].click();
                return true;
            }
        }
        return false;
    }

    //get product detail page title
    public async getProductDetailTitle(): Promise<string> {
        const titleElement = this.page.locator('.inventory_details_name');
        await titleElement.waitFor({ state: 'visible', timeout: 5000 });
        return await titleElement.textContent() || '';
    }

    //verify product details are visible
    public async areProductDetailsVisible(): Promise<boolean> {
        return await this.productNames().first().isVisible() && 
               await this.productPrices().first().isVisible() &&
               await this.productDescriptions().first().isVisible();
    }

    //add product to cart by name
    public async addProductToCartByName(productName: string) {
        const productNames = await this.productNames().all();
        for (let i = 0; i < productNames.length; i++) {
            const name = await productNames[i].textContent();
            if (name && name.includes(productName)) {
                const addToCartButton = this.addToCartButtons().nth(i);
                await addToCartButton.click();
                return true;
            }
        }
        return false;
    }

    //click cart icon
    public async clickCartIcon() {
        const cartIcon = this.page.locator('.shopping_cart_link');
        await cartIcon.click();
    }

    //click continue shopping button
    public async clickContinueShopping() {
        const continueButton = this.page.locator('#continue-shopping');
        await continueButton.click();
    }

    //get cart icon badge count
    public async getCartIconCount(): Promise<number> {
        const cartBadge = this.page.locator('.shopping_cart_badge');
        if (await cartBadge.isVisible()) {
            const countText = await cartBadge.textContent();
            return countText ? parseInt(countText) : 0;
        }
        return 0;
    }
}
