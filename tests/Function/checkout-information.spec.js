import { test, expect } from "@playwright/test";
import users from "../../test-data/user.js";

const { LoginPage } = require("../../pages/LoginPage.js");
const { ProductsPage } = require("../../pages/ProductsPage.js");
const { ProductDetailsPage } = require("../../pages/ProductDetailsPage.js");
const { CheckoutInformationPage } = require("../../pages/CheckoutInformationPage.js");

test.describe("Checkout Information Functional Tests", () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    await loginPage.open();
    await loginPage.login( users.standardUser.username, users.standardUser.password );
    await productsPage.openFirstProduct();
    await productDetailsPage.addToCart();
    await productDetailsPage.openCart();
    await expect(page) .toHaveURL(/cart/);
    await page .locator('[data-test="checkout"]') .click();
    await expect(page) .toHaveURL(/checkout-step-one/);

  });

  test("Fill customer information", async ({ page }) => {

    const checkoutPage = new CheckoutInformationPage(page);

    await checkoutPage.fillCustomerInformation(
      users.standardUser.checkout.firstName,
      users.standardUser.checkout.lastName,
      users.standardUser.checkout.postalCode
    );
    await expect( checkoutPage.firstName ).toHaveValue( users.standardUser.checkout.firstName );
    await expect( checkoutPage.lastName ).toHaveValue( users.standardUser.checkout.lastName );
    await expect( checkoutPage.postalCode ).toHaveValue( users.standardUser.checkout.postalCode );

  });

  test("Continue to Checkout Overview", async ({ page }) => {

    const checkoutPage = new CheckoutInformationPage(page);

    await checkoutPage.fillCustomerInformation(
      users.standardUser.checkout.firstName,
      users.standardUser.checkout.lastName,
      users.standardUser.checkout.postalCode
    );
    await checkoutPage.continueToOverview();
    await expect(page) .toHaveURL(/checkout-step-two/);

  });

  test("Cancel checkout", async ({ page }) => {

    const checkoutPage = new CheckoutInformationPage(page);

    await checkoutPage.cancelCheckout();
    await expect(page) .toHaveURL(/cart/);

  });

});