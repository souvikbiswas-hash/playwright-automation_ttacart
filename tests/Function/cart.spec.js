import { test, expect } from "../../fixtures/fixtures.js";

const { LoginPage } = require("../../pages/LoginPage.js");

test.describe("Cart Functional Tests", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
  });


  test("Added product appears in cart", async ({ cartPage }) => {
    await expect(cartPage.cartItems).toHaveCount(1);
  });


  test("Remove product from cart", async ({ cartPage }) => {
    await expect(cartPage.cartItems).toHaveCount(1);
    await cartPage.removeFirstProduct();
    await expect(cartPage.cartItems).toHaveCount(0);
  });


  test("Continue shopping from cart", async ({ page, cartPage }) => {
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory/);
  });


  test("Proceed to checkout", async ({ page, cartPage }) => {
    await cartPage.checkout();
    await expect(page).toHaveURL(/checkout-step-one/);
  });

});