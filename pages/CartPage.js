class CartPage {

  constructor(page) {

    this.page = page;

    this.pageTitle = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.cartItemNames = page.locator('[data-test="inventory-item-name"]');
    this.cartItemPrices = page.locator('[data-test="inventory-item-price"]');

    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.removeButton = page.getByRole('button', { name: /remove/i });

  }

  async continueShopping() {

    await this.continueShoppingButton.click();

  }

  async checkout() {

    await this.checkoutButton.click();

  }

  async removeFirstProduct() {

    await this.removeButton.first().click();

  }

}

module.exports = { CartPage };