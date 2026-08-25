import { test, expect } from "@playwright/test";
import users from "../../test-data/user.js";
import products from "../../test-data/products.js";

const { LoginPage } = require("../../pages/LoginPage.js");
const { ProductsPage } = require("../../pages/ProductsPage.js");

const productList = Object.values(products);

test.describe("Products Page UI Tests", () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login( users.standardUser.username, users.standardUser.password );
    await expect(page) .toHaveURL(/inventory/);

  });

  test("Show burger menu", async ({ page }) => {

    const productsPage = new ProductsPage(page);

    await expect( productsPage.burgerMenuButton ).toBeVisible();

  });

  test("Show page title", async ({ page }) => {

    const productsPage = new ProductsPage(page);

    await expect( productsPage.brandTitle ).toHaveText(/TTACart/);

  });

  test("Show cart button", async ({ page }) => {

    const productsPage = new ProductsPage(page);

    await expect( productsPage.cart ).toBeVisible();

  });

  test("Show Products as title", async ({ page }) => {

    const productsPage = new ProductsPage(page);

    await expect( productsPage.pageTitle ).toHaveText("Products");

  });

  test("Show filter", async ({ page }) => {

    const productsPage = new ProductsPage(page);

    await expect( productsPage.filter ).toBeVisible();

  });

  test("Show all products", async ({ page }) => {

    const productsPage = new ProductsPage(page);
    const productCards = productsPage.products;

    await expect(productCards) .toHaveCount(productList.length);

    for (let i = 0; i < productList.length; i++) {

      const product = productCards.nth(i);

      // Product name
      await expect( product.locator( '[data-test="inventory-item-name"]' ) ).toHaveText( productList[i].name );

      // Product description
      await expect( product.locator( '[data-test="inventory-item-desc"]' ) ).toContainText( productList[i].description );

      // Product price
      await expect( product.locator( '[data-test="inventory-item-price"]' ) ).toHaveText( productList[i].price );

      // Product picture
      await expect( product.locator( '[data-test="item-img-link"]' ) ).toBeVisible();

      // Add to Cart or Remove button
      const addToCartButton = product.locator(".item-btn");
      const removeButton = product.locator(".item-btn.is-remove");
      const isAddToCartVisible = await addToCartButton.isVisible();

      if (isAddToCartVisible) {

        await expect(addToCartButton) .toContainText("Add to cart");

      } else {

        await expect(removeButton) .toBeVisible();
        await expect(removeButton) .toContainText("Remove");

      }

    }

  });

  test("Show Footer", async ({ page }) => {

    const productsPage = new ProductsPage(page);

    await expect( productsPage.footer ).toBeVisible();

  });

  test("Show Footer icons", async ({ page }) => {

    const productsPage = new ProductsPage(page);

    await expect( productsPage.twitterIcon ).toBeVisible();
    await expect( productsPage.facebookIcon ).toBeVisible();
    await expect( productsPage.linkedinIcon ).toBeVisible();

  });

  test("Show Footer text", async ({ page }) => {

    const productsPage = new ProductsPage(page);

    await expect( productsPage.footerText ).toHaveText( "(c) 2026 TTACart - The Testing Academy. All Rights Reserved. Terms of Service | Privacy Policy" );

  });

});