import { test, expect } from "../../fixtures/fixtures.js";
import users from "../../test-data/user.js";

const { LoginPage } = require("../../pages/LoginPage.js");

test.describe("Checkout Information Functional Tests", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
  });


  test("Fill customer information", async ({ checkoutInformationPage }) => {
    await checkoutInformationPage.fillCustomerInformation(
      users.standardUser.checkout.firstName,
      users.standardUser.checkout.lastName,
      users.standardUser.checkout.postalCode
    );
    await expect(checkoutInformationPage.firstName).toHaveValue(users.standardUser.checkout.firstName);
    await expect(checkoutInformationPage.lastName).toHaveValue(users.standardUser.checkout.lastName);
    await expect(checkoutInformationPage.postalCode).toHaveValue(users.standardUser.checkout.postalCode);
  });


  test("Continue to Checkout Overview", async ({ page, checkoutInformationPage }) => {
    await checkoutInformationPage.fillCustomerInformation(
      users.standardUser.checkout.firstName,
      users.standardUser.checkout.lastName,
      users.standardUser.checkout.postalCode
    );
    await checkoutInformationPage.continueToOverview();
    await expect(page).toHaveURL(/checkout-step-two/);
  });


  test("Cancel checkout", async ({ page, checkoutInformationPage }) => {
    await checkoutInformationPage.cancelCheckout();
    await expect(page).toHaveURL(/cart/);
  });

});