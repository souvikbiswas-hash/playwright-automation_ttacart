import { test, expect } from "../../fixtures/fixtures.js";

const { LoginPage } = require("../../pages/LoginPage.js");

test.describe("Checkout Overview Functional Tests", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test("Product appears in Checkout Overview", async ({ checkoutOverviewPage }) => {
    await expect(checkoutOverviewPage.cartItems).toHaveCount(1);
  });

  test("Product name appears in Checkout Overview", async ({ checkoutOverviewPage }) => {
    await expect(checkoutOverviewPage.productName.first()).toBeVisible();
  });

  test("Product price appears in Checkout Overview", async ({ checkoutOverviewPage }) => {
    await expect(checkoutOverviewPage.productPrice.first()).toBeVisible();
  });

  test("Subtotal is displayed", async ({ checkoutOverviewPage }) => {
    await expect(checkoutOverviewPage.subtotal).toBeVisible();
  });

  test("Tax is displayed", async ({ checkoutOverviewPage }) => {
    await expect(checkoutOverviewPage.tax).toBeVisible();
  });

  test("Total is displayed", async ({ checkoutOverviewPage }) => {
    await expect(checkoutOverviewPage.total).toBeVisible();
  });

  test("Finish order", async ({ page, checkoutOverviewPage }) => {
    await checkoutOverviewPage.finishOrder();
    await expect(page).toHaveURL(/checkout-complete/);
  });

  test("Cancel checkout from Overview", async ({ page, checkoutOverviewPage }) => {
    await checkoutOverviewPage.cancelCheckout();
    await expect(page).toHaveURL(/cart/);
  });

});