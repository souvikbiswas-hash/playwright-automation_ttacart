import { test, expect } from "../../fixtures/fixtures.js";
import products from "../../test-data/products.js";

const { LoginPage } = require("../../pages/LoginPage.js");

const productList = Object.values(products);

test.describe("Products Page UI Tests", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
  });


  test("Show burger menu", async ({ productsPage }) => {
    await expect(productsPage.burgerMenuButton).toBeVisible();
  });


  test("Show page title", async ({ productsPage }) => {
    await expect(productsPage.brandTitle).toHaveText(/TTACart/);
  });


  test("Show cart button", async ({ productsPage }) => {
    await expect(productsPage.cart).toBeVisible();
  });


  test("Show Products as title", async ({ productsPage }) => {
    await expect(productsPage.pageTitle).toHaveText("Products");
  });


  test("Show filter", async ({ productsPage }) => {
    await expect(productsPage.filter).toBeVisible();
  });


  test("Show all products", async ({ productsPage }) => {

    const productCards = productsPage.products;

    await expect(productCards).toHaveCount(productList.length);

    for (let i = 0; i < productList.length; i++) {

      const product = productCards.nth(i);

      await expect(product.locator('[data-test="inventory-item-name"]')).toHaveText(productList[i].name);

      await expect(product.locator('[data-test="inventory-item-desc"]')).toContainText(productList[i].description);

      await expect(product.locator('[data-test="inventory-item-price"]')).toHaveText(productList[i].price);

      await expect(product.locator('[data-test="item-img-link"]')).toBeVisible();

      const addToCartButton = product.locator(".item-btn");
      const removeButton = product.locator(".item-btn.is-remove");
      const isAddToCartVisible = await addToCartButton.isVisible();

      if (isAddToCartVisible) {
        await expect(addToCartButton).toContainText("Add to cart");
      } else {
        await expect(removeButton).toBeVisible();
        await expect(removeButton).toContainText("Remove");
      }

    }

  });


  test("Show Footer", async ({ productsPage }) => {
    await expect(productsPage.footer).toBeVisible();
  });


  test("Show Footer icons", async ({ productsPage }) => {
    await expect(productsPage.twitterIcon).toBeVisible();
    await expect(productsPage.facebookIcon).toBeVisible();
    await expect(productsPage.linkedinIcon).toBeVisible();
  });


  test("Show Footer text", async ({ productsPage }) => {
    await expect(productsPage.footerText).toHaveText("(c) 2026 TTACart - The Testing Academy. All Rights Reserved. Terms of Service | Privacy Policy");
  });

});