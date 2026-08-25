class ProductsPage {

  constructor(page) {

    this.page = page;

    this.brandTitle = page.locator(".tta-brand-title");
    this.pageTitle = page.locator(".page-title");
    this.filter = page.locator(".sort-wrap");

    this.products = page.locator( '[data-test="inventory-item"]' );
    this.productNames = page.locator( '[data-test="inventory-item-name"]' );
    this.productPrices = page.locator( '[data-test="inventory-item-price"]' );
    this.productDescriptions = page.locator( '[data-test="inventory-item-desc"]' );

    this.cart = page.locator( '[data-test="shopping-cart-link"]' );
    this.cartBadge = page.locator( '[data-test="shopping-cart-badge"]' );

    this.burgerMenuButton = page.locator( "#react-burger-menu-btn" );
    this.closeBurgerMenuButton = page.locator( "#react-burger-cross-btn" );
    this.sideMenu = page.locator( "#sideMenu" );
    this.sidebarLinks = page.locator( ".inventory_sidebar_link" );

    this.footer = page.locator( '[data-test="footer"]' );
    this.twitterIcon = page.locator( '[data-test="social-twitter"]' );
    this.facebookIcon = page.locator( '[data-test="social-facebook"]' );
    this.linkedinIcon = page.locator( '[data-test="social-linkedin"]' );
    this.footerText = page.locator( '[data-test="footer-copy"]' );

  }

  async openBurgerMenu() {

    await this.burgerMenuButton.click();

  }

  async closeBurgerMenu() {

    await this.closeBurgerMenuButton.click();

  }

  async addFirstProduct() {

    await this.products .first() .locator(".item-btn") .click();

  }

  async addAllProducts() {

    const count = await this.products.count();

    for (let i = 0; i < count; i++) {

      await this.products .nth(i) .locator(".item-btn") .click();

    }

  }

  async removeAllProducts() {

  const count = await this.products.count();

  for (let i = 0; i < count; i++) {

    await this.products .nth(i) .locator(".item-btn") .click();

  }

}

async openFirstProduct() {

    await this.products .first() .locator('[data-test="item-img-link"]') .click();

}

  async openCart() {

    await this.cart.click();

  }

}

module.exports = { ProductsPage };