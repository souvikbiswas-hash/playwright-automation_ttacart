class ProductsPage {

  constructor(page) {

    this.page = page;

    this.title =
      page.locator('.page-title');

    this.products =
      page.locator('.inventory_item');

    this.productNames =
      page.locator('.inventory_item_name');

    this.productPrices =
      page.locator('.inventory_item_price');

    this.addToCartButtons =
      page.getByRole('button', {
        name: /Add to cart/i
      });

    this.cart =
      page.locator('.shopping_cart_link');

  }


  async addFirstProduct() {

    await this.addToCartButtons
      .first()
      .click();

  }


  async openCart() {

    await this.cart.click();

  }


  async openFirstProduct() {

    await this.productNames
      .first()
      .click();

  }

}

module.exports = { ProductsPage };