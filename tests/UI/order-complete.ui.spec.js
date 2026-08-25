import { test, expect } from "@playwright/test";
import users from "../../test-data/user.js";

const { LoginPage } = require("../../pages/LoginPage.js");
const { ProductsPage } = require("../../pages/ProductsPage.js");
const { ProductDetailsPage } = require("../../pages/ProductDetailsPage.js");
const { CartPage } = require("../../pages/CartPage.js");
const { CheckoutInformationPage } = require("../../pages/CheckoutInformationPage.js");
const { CheckoutOverviewPage } = require("../../pages/CheckoutOverviewPage.js");
const { OrderCompletePage } = require("../../pages/OrderCompletePage.js");

test.describe("Order Complete UI Tests", () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);
    const checkoutInformationPage = new CheckoutInformationPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);

    await loginPage.open();
    await loginPage.login( users.standardUser.username, users.standardUser.password );
    await productsPage.openFirstProduct();
    await productDetailsPage.addToCart();
    await productDetailsPage.openCart();
    await cartPage.checkout();
    await checkoutInformationPage.fillCustomerInformation(
      users.standardUser.checkout.firstName,
      users.standardUser.checkout.lastName,
      users.standardUser.checkout.postalCode
    );
    await checkoutInformationPage.continueToOverview();
    await checkoutOverviewPage.finishOrder();
    await expect(page) .toHaveURL(/checkout-complete/);

  });

  test("Show Order Complete title", async ({ page }) => {

    const orderCompletePage = new OrderCompletePage(page);
    await expect( orderCompletePage.pageTitle ).toHaveText("Checkout: Complete!");

  });

  test("Show order confirmation message", async ({ page }) => {

    const orderCompletePage = new OrderCompletePage(page);
    await expect( orderCompletePage.completeHeader ).toBeVisible();

  });

  test("Show confirmation text", async ({ page }) => {

    const orderCompletePage = new OrderCompletePage(page);
    await expect( orderCompletePage.completeText ).toBeVisible();

  });

  test("Show Back Home button", async ({ page }) => {

    const orderCompletePage = new OrderCompletePage(page);
    await expect( orderCompletePage.backHomeButton ).toBeVisible();

  });

});