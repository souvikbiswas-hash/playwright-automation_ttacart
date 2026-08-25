import { test, expect } from "@playwright/test";
import users from "../../test-data/user.js";

const { LoginPage } = require("../../pages/LoginPage.js");
const { ProductsPage } = require("../../pages/ProductsPage.js");
const { ProductDetailsPage } = require("../../pages/ProductDetailsPage.js");
const { CartPage } = require("../../pages/CartPage.js");

test.describe("Cart UI Tests", () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    await loginPage.open();
    await loginPage.login( users.standardUser.username, users.standardUser.password );
    await expect(page) .toHaveURL(/inventory/);
    await productsPage.openFirstProduct();
    await productDetailsPage.addToCart();
    await productDetailsPage.openCart();
    await expect(page) .toHaveURL(/cart/);

  });

  test("Show Cart title", async ({ page }) => {

    const cartPage = new CartPage(page);
    await expect( cartPage.pageTitle ).toHaveText("Your Cart");

  });

  test("Show product name in cart", async ({ page }) => {

    const cartPage = new CartPage(page);
    await expect( cartPage.cartItemNames.first() ).toBeVisible();

  });

  test("Show product price in cart", async ({ page }) => {

    const cartPage = new CartPage(page);
    await expect( cartPage.cartItemPrices.first() ).toBeVisible();

  });

  test("Show Continue Shopping button", async ({ page }) => {

    const cartPage = new CartPage(page);
    await expect( cartPage.continueShoppingButton ).toBeVisible();

  });

  test("Show Checkout button", async ({ page }) => {

    const cartPage = new CartPage(page);
    await expect( cartPage.checkoutButton ).toBeVisible();

  });

});