import { test, expect } from "@playwright/test";

import users from "../../test-data/user.js";
import products from "../../test-data/products.js";

const productList = Object.values(products);

const BASEURL =
  "https://app.thetestingacademy.com/playwright/ttacart/";

test.describe("Products Page UI Tests", () => {

  test.beforeEach(async ({ page }) => {

    await page.goto(BASEURL);

    await page.locator("#user-name")
      .fill(users.standardUser.username);

    await page.locator("#password")
      .fill(users.standardUser.password);

    await page.locator("#login-button")
      .click();

    await expect(page)
      .toHaveURL(/inventory/);

  });


  test("Show burger menu", async ({ page }) => {

    await expect(
      page.locator("#react-burger-menu-btn")
    ).toBeVisible();

  });


  test("Show page title", async ({ page }) => {

    await expect(
      page.locator(".tta-brand-title")
    ).toHaveText(/TTACart/);

  });


  test("Show cart button", async ({ page }) => {

    await expect(
      page.locator('[data-test="shopping-cart-link"]')
    ).toBeVisible();

  });


  test("Show Products as title", async ({ page }) => {

    await expect(
      page.locator(".page-title")
    ).toHaveText("Products");

  });


  test("Show filter", async ({ page }) => {

    await expect(
      page.locator(".sort-wrap")
    ).toBeVisible();

  });


  test("Show all products", async ({ page }) => {

  const productCards = page.locator(
    '[data-test="inventory-item"]'
  );

  await expect(productCards)
    .toHaveCount(productList.length);

  for (let i = 0; i < productList.length; i++) {

    const product = productCards.nth(i);

    // Product name
    await expect(
      product.locator('[data-test="inventory-item-name"]')
    ).toHaveText(productList[i].name);

    // Product description
    await expect(
      product.locator('[data-test="inventory-item-desc"]')
    ).toContainText(productList[i].description);

    // Product price
    await expect(
      product.locator('[data-test="inventory-item-price"]')
    ).toHaveText(productList[i].price);

    // Product picture
    await expect(
      product.locator('[data-test="item-img-link"]')
    ).toBeVisible();

    // Add to Cart or Remove button
    const addToCartButton = product.locator('.item-btn');
    const removeButton = product.locator('.item-btn.is-remove');

    const isAddToCartVisible =
      await addToCartButton.isVisible();

    if (isAddToCartVisible) {

      await expect(addToCartButton)
        .toContainText("Add to cart");

    } else {

      await expect(removeButton)
        .toBeVisible();

      await expect(removeButton)
        .toContainText("Remove");

    }

  }

});

test("Show Footer", async ({ page }) => {
  
  await expect(page.locator('[data-test="footer"]')).toBeVisible();
});

test("Show Footer icons", async ({ page }) => {

  await expect(page.locator('[data-test="social-twitter"]')).toBeVisible();
  await expect(page.locator('[data-test="social-facebook"]')).toBeVisible();
  await expect(page.locator('[data-test="social-linkedin"]')).toBeVisible();
});

test("Show Footer text", async ({ page }) => {

  await expect(page.locator('[data-test="footer-copy"]')).toHaveText(
    "(c) 2026 TTACart - The Testing Academy. All Rights Reserved. Terms of Service | Privacy Policy",
  );
});

  });