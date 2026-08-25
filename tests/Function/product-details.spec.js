import { test, expect } from "@playwright/test";
import users from "../../test-data/user.js";

const { LoginPage } = require("../../pages/LoginPage.js");
const { ProductsPage } = require("../../pages/ProductsPage.js");
const { ProductDetailsPage } = require("../../pages/ProductDetailsPage.js");

test.describe("Product Details Functional Tests", () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.open();
    await loginPage.login( users.standardUser.username, users.standardUser.password );
    await expect(page) .toHaveURL(/inventory/);
    await productsPage.openFirstProduct();
    await expect(page) .toHaveURL(/inventory-item/);
  });

  test("Add product to cart", async ({ page }) => {

    const productDetailsPage = new ProductDetailsPage(page);

    await productDetailsPage.addToCart();
    await expect( productDetailsPage.cartBadge ).toHaveText("1");

  });

  test("Open cart from product details", async ({ page }) => {

    const productDetailsPage = new ProductDetailsPage(page);

    await productDetailsPage.addToCart();
    await productDetailsPage.openCart();
    await expect(page) .toHaveURL(/cart/);

  });

});