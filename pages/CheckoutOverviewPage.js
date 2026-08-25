class CheckoutOverviewPage {

  constructor(page) {

    this.page = page;

    this.pageTitle = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    
    this.subtotal = page.locator('[data-test="subtotal-label"]');
    this.tax = page.locator('[data-test="tax-label"]');
    this.total = page.locator('[data-test="total-label"]');

    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');

  }

  async finishOrder() {

    await this.finishButton.click();

  }

  async cancelCheckout() {

    await this.cancelButton.click();

  }

}

module.exports = { CheckoutOverviewPage };