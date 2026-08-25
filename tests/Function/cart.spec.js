import { test, expect } from "@playwright/test";
import users from "../../test-data/user.js";

const { LoginPage } = require("../../pages/LoginPage.js");
const { ProductsPage } = require("../../pages/ProductsPage.js");
const { ProductDetailsPage } = require("../../pages/ProductDetailsPage.js");
const { CartPage } = require("../../pages/CartPage.js");

test.describe("Cart Functional Tests", () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    await loginPage.open();
    await loginPage.login(users.standardUser.username,users.standardUser.password);
    await expect(page).toHaveURL(/inventory/);
    await productsPage.openFirstProduct();
    await productDetailsPage.addToCart();
    await productDetailsPage.openCart();
    await expect(page).toHaveURL(/cart/);

  });

  test("Added product appears in cart", async ({ page }) => {

    const cartPage = new CartPage(page);

    await expect( cartPage.cartItems ).toHaveCount(1);

  });

  test("Remove product from cart", async ({ page }) => {

    const cartPage = new CartPage(page);

    await expect( cartPage.cartItems ).toHaveCount(1);
    await cartPage.removeFirstProduct();
    await expect( cartPage.cartItems ).toHaveCount(0);

  });

  test("Continue shopping from cart", async ({ page }) => {

    const cartPage = new CartPage(page);

    await cartPage.continueShopping();
    await expect(page) .toHaveURL(/inventory/);

  });

  test("Proceed to checkout", async ({ page }) => {

    const cartPage = new CartPage(page);

    await cartPage.checkout();
    await expect(page) .toHaveURL(/checkout-step-one/);
  });

});