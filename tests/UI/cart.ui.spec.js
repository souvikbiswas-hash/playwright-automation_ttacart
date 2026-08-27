import { test, expect } from "../../fixtures/fixtures.js";

const { LoginPage } = require("../../pages/LoginPage.js");

test.describe("Cart UI Tests", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
  });


  test("Show Cart title", async ({ cartPage }) => {
    await expect(cartPage.pageTitle).toHaveText("Your Cart");
  });


  test("Show product name in cart", async ({ cartPage }) => {
    await expect(cartPage.cartItemNames.first()).toBeVisible();
  });


  test("Show product price in cart", async ({ cartPage }) => {
    await expect(cartPage.cartItemPrices.first()).toBeVisible();
  });


  test("Show Continue Shopping button", async ({ cartPage }) => {
    await expect(cartPage.continueShoppingButton).toBeVisible();
  });


  test("Show Checkout button", async ({ cartPage }) => {
    await expect(cartPage.checkoutButton).toBeVisible();
  });

});