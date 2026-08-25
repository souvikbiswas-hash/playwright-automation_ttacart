class ProductDetailsPage {

  constructor(page) {

    this.page = page;

    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.productDescription = page.locator('[data-test="inventory-item-desc"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    // this.productImage = page.locator('img').first();

    this.cart = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.addToCartButton = page.locator('.item-btn');

  }

  async addToCart() {

    await this.addToCartButton.click();

  }

  async openCart() {

    await this.cart.click();

  }

}

module.exports = { ProductDetailsPage };