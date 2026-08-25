class OrderCompletePage {

  constructor(page) {

    this.page = page;

    this.pageTitle = page.locator('[data-test="title"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');

  }

  async backToProducts() {

    await this.backHomeButton.click();

  }

}

module.exports = { OrderCompletePage };