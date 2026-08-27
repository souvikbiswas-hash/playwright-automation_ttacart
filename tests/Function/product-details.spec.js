import { test, expect } from "../../fixtures/fixtures.js";

const { LoginPage } = require("../../pages/LoginPage.js");

test.describe("Product Details Functional Tests", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
  });


  test("Add product to cart", async ({ productDetailsPage }) => {
    await productDetailsPage.addToCart();
    await expect(productDetailsPage.cartBadge).toHaveText("1");
  });


  test("Open cart from product details", async ({ page, productDetailsPage }) => {
    await productDetailsPage.addToCart();
    await productDetailsPage.openCart();
    await expect(page).toHaveURL(/cart/);
  });

});