import { Page } from "@playwright/test";

export default class ProductsPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /*
    LOCATORS
        Locators of Login Page
    */
    lblProducts = () => this.page.getByText('Products');  //products label

    /*
    ACTIONS
        actions perfoms inside the class
    */

    //verify the Product label is visible
    public async productsIsVisible() {
        console.log("Product label foud: " + this.lblProducts().isVisible());
        return this.lblProducts().isVisible();
    }
}
