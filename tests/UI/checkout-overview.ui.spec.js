import { test, expect } from "@playwright/test";
import users from "../../test-data/user.js";

const { LoginPage } = require("../../pages/LoginPage.js");
const { ProductsPage } = require("../../pages/ProductsPage.js");
const { ProductDetailsPage } = require("../../pages/ProductDetailsPage.js");
const { CheckoutInformationPage } = require("../../pages/CheckoutInformationPage.js");
const { CheckoutOverviewPage } = require("../../pages/CheckoutOverviewPage.js");

test.describe("Checkout Overview UI Tests", () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const checkoutInformationPage = new CheckoutInformationPage(page);

    await loginPage.open();
    await loginPage.login( users.standardUser.username, users.standardUser.password );
    await productsPage.openFirstProduct();
    await productDetailsPage.addToCart();
    await productDetailsPage.openCart();
    await checkoutInformationPage.page .locator('[data-test="checkout"]') .click();
    await expect(page) .toHaveURL(/checkout-step-one/);
    await checkoutInformationPage.fillCustomerInformation(
      users.standardUser.checkout.firstName,
      users.standardUser.checkout.lastName,
      users.standardUser.checkout.postalCode
    );
    await checkoutInformationPage.continueToOverview();
    await expect(page) .toHaveURL(/checkout-step-two/);

  });

  test("Show Checkout Overview title", async ({ page }) => {

    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect( checkoutOverviewPage.pageTitle ).toHaveText("Checkout: Overview");

  });

  test("Show product name", async ({ page }) => {

    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect( checkoutOverviewPage.productName.first() ).toBeVisible();

  });

  test("Show product price", async ({ page }) => {

    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect( checkoutOverviewPage.productPrice.first() ).toBeVisible();

  });

  test("Show subtotal", async ({ page }) => {

    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect( checkoutOverviewPage.subtotal ).toBeVisible();

  });

  test("Show tax", async ({ page }) => {

    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect( checkoutOverviewPage.tax ).toBeVisible();

  });

  test("Show total", async ({ page }) => {

    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect( checkoutOverviewPage.total ).toBeVisible();

  });

  test("Show Cancel button", async ({ page }) => {

    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect( checkoutOverviewPage.cancelButton ).toBeVisible();

  });

  test("Show Finish button", async ({ page }) => {

    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect( checkoutOverviewPage.finishButton ).toBeVisible();

  });

});