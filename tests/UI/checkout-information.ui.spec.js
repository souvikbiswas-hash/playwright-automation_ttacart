import { test, expect } from "@playwright/test";
import users from "../../test-data/user.js";

const { LoginPage } = require("../../pages/LoginPage.js");
const { ProductsPage } = require("../../pages/ProductsPage.js");
const { ProductDetailsPage } = require("../../pages/ProductDetailsPage.js");
const { CheckoutInformationPage } = require("../../pages/CheckoutInformationPage.js");

test.describe("Checkout Information UI Tests", () => {

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

  test("Show Checkout Information title", async ({ page }) => {

    const checkoutPage = new CheckoutInformationPage(page);
    await expect( checkoutPage.pageTitle ).toHaveText("Checkout: Your Information");

  });

  test("Show First Name field", async ({ page }) => {

    const checkoutPage = new CheckoutInformationPage(page);
    await expect( checkoutPage.firstName ).toBeVisible();

  });

  test("Show Last Name field", async ({ page }) => {

    const checkoutPage = new CheckoutInformationPage(page);
    await expect( checkoutPage.lastName ).toBeVisible();

  });

  test("Show Postal Code field", async ({ page }) => {

    const checkoutPage = new CheckoutInformationPage(page);
    await expect( checkoutPage.postalCode ).toBeVisible();

  });

  test("Show Cancel button", async ({ page }) => {

    const checkoutPage = new CheckoutInformationPage(page);
    await expect( checkoutPage.cancelButton ).toBeVisible();

  });

  test("Show Continue button", async ({ page }) => {

    const checkoutPage = new CheckoutInformationPage(page);
    await expect( checkoutPage.continueButton ).toBeVisible();

  });

});