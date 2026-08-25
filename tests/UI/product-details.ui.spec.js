import { test, expect } from "@playwright/test";
import users from "../../test-data/user.js";

const { LoginPage } = require("../../pages/LoginPage.js");
const { ProductsPage } = require("../../pages/ProductsPage.js");
const { ProductDetailsPage } = require("../../pages/ProductDetailsPage.js");

test.describe("Product Details UI Tests", () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.open();
    await loginPage.login( users.standardUser.username, users.standardUser.password );
    await expect(page) .toHaveURL(/inventory/);
    await productsPage.openFirstProduct();
    await expect(page) .toHaveURL(/inventory-item/);

  });

  test("Show product name", async ({ page }) => {

    const productDetailsPage = new ProductDetailsPage(page);

    await expect( productDetailsPage.productName ).toBeVisible();

  });

  test("Show product description", async ({ page }) => {

    const productDetailsPage = new ProductDetailsPage(page);

    await expect( productDetailsPage.productDescription ).toBeVisible();

  });

  test("Show product price", async ({ page }) => {

    const productDetailsPage = new ProductDetailsPage(page);
    await expect( productDetailsPage.productPrice ).toBeVisible();
  });


  // test("Show product image", async ({ page }) => {

  //   const productDetailsPage = new ProductDetailsPage(page);

  //   await expect( productDetailsPage.productImage ).toBeVisible();

  // });


  test("Show Add to Cart button", async ({ page }) => {

    const productDetailsPage = new ProductDetailsPage(page);

    await expect( productDetailsPage.addToCartButton ).toBeVisible();

  });


  test("Show cart button", async ({ page }) => {

    const productDetailsPage = new ProductDetailsPage(page);

    await expect( productDetailsPage.cart ).toBeVisible();

  });

});