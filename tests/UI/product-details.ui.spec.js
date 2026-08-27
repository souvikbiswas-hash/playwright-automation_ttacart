import { test, expect } from "../../fixtures/fixtures.js";

const { LoginPage } = require("../../pages/LoginPage.js");

test.describe("Product Details UI Tests", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
  });


  test("Show product name", async ({ productDetailsPage }) => {
    await expect(productDetailsPage.productName).toBeVisible();
  });


  test("Show product description", async ({ productDetailsPage }) => {
    await expect(productDetailsPage.productDescription).toBeVisible();
  });


  test("Show product price", async ({ productDetailsPage }) => {
    await expect(productDetailsPage.productPrice).toBeVisible();
  });


  // test("Show product image", async ({ productDetailsPage }) => {
  //   await expect(productDetailsPage.productImage).toBeVisible();
  // });


  test("Show Add to Cart button", async ({ productDetailsPage }) => {
    await expect(productDetailsPage.addToCartButton).toBeVisible();
  });


  test("Show cart button", async ({ productDetailsPage }) => {
    await expect(productDetailsPage.cart).toBeVisible();
  });

});