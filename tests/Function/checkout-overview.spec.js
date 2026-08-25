import { test, expect } from "@playwright/test";
import users from "../../test-data/user.js";

const { LoginPage } = require("../../pages/LoginPage.js");
const { ProductsPage } = require("../../pages/ProductsPage.js");
const { ProductDetailsPage } = require("../../pages/ProductDetailsPage.js");
const { CartPage } = require("../../pages/CartPage.js");
const { CheckoutInformationPage } = require("../../pages/CheckoutInformationPage.js");
const { CheckoutOverviewPage } = require("../../pages/CheckoutOverviewPage.js");

test.describe("Checkout Overview Functional Tests", () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);
    const checkoutInformationPage = new CheckoutInformationPage(page);

    await loginPage.open();
    await loginPage.login( users.standardUser.username, users.standardUser.password );
    await expect(page) .toHaveURL(/inventory/);
    await productsPage.openFirstProduct();
    await productDetailsPage.addToCart();
    await productDetailsPage.openCart();
    await expect(page) .toHaveURL(/cart/);
    await cartPage.checkout();
    await expect(page) .toHaveURL(/checkout-step-one/);
    await checkoutInformationPage.fillCustomerInformation(
      users.standardUser.checkout.firstName,
      users.standardUser.checkout.lastName,
      users.standardUser.checkout.postalCode
    );
    await checkoutInformationPage.continueToOverview();
    await expect(page) .toHaveURL(/checkout-step-two/);

  });

  test("Product appears in Checkout Overview", async ({ page }) => {

    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect( checkoutOverviewPage.cartItems ).toHaveCount(1);

  });

  test("Product name appears in Checkout Overview", async ({ page }) => {

    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect( checkoutOverviewPage.productName.first() ).toBeVisible();

  });

  test("Product price appears in Checkout Overview", async ({ page }) => {

    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect( checkoutOverviewPage.productPrice.first() ).toBeVisible();

  });

  test("Subtotal is displayed", async ({ page }) => {

    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect( checkoutOverviewPage.subtotal ).toBeVisible();

  });

  test("Tax is displayed", async ({ page }) => {

    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect( checkoutOverviewPage.tax ).toBeVisible();

  });

  test("Total is displayed", async ({ page }) => {

    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect( checkoutOverviewPage.total ).toBeVisible();

  });

  test("Finish order", async ({ page }) => {

    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await checkoutOverviewPage.finishOrder();
    await expect(page) .toHaveURL(/checkout-complete/);

  });

  test("Cancel checkout from Overview", async ({ page }) => {

    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await checkoutOverviewPage.cancelCheckout();
    await expect(page) .toHaveURL(/cart/);

  });

});