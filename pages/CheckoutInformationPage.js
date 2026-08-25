class CheckoutInformationPage {

  constructor(page) {

    this.page = page;

    this.pageTitle = page.locator('[data-test="title"]');

    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');

    this.cancelButton = page.locator('[data-test="cancel"]');
    this.continueButton = page.locator('[data-test="continue"]');

  }

  async fillCustomerInformation(
    firstName,
    lastName,
    postalCode
  ) {

    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);

  }

  async continueToOverview() {

    await this.continueButton.click();

  }

  async cancelCheckout() {

    await this.cancelButton.click();

  }

}

module.exports = { CheckoutInformationPage };