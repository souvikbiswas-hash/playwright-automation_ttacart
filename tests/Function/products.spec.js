import { test, expect } from "@playwright/test";

import users from "../../test-data/user.js";
import products from "../../test-data/products.js";

const productList = Object.values(products);

const BASEURL =
  "https://app.thetestingacademy.com/playwright/ttacart/";


test.describe("Products Page Functional Tests", () => {


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


  test("Open burger menu", async ({ page }) => {

    await page.locator("#react-burger-menu-btn")
      .click();

    await expect(
      page.locator("#sideMenu")
    ).toBeVisible();

  });


  test("Close burger menu", async ({ page }) => {

    await page.locator("#react-burger-menu-btn")
      .click();

    await expect(
      page.locator("#sideMenu")
    ).toBeVisible();

    await page.locator("#react-burger-cross-btn")
      .click();

    await expect(
      page.locator(".inventory_sidebar_link")
    ).toBeHidden();

  });


  test("Add all products to cart", async ({ page }) => {

  const productCards = page.locator(
    '[data-test="inventory-item"]'
  );

  await expect(productCards)
    .toHaveCount(productList.length);

  for (let i = 0; i < productList.length; i++) {

    await productCards
      .nth(i)
      .locator(".item-btn")
      .click();

  }

  await expect(
    page.locator('[data-test="shopping-cart-badge"]')
  ).toHaveText(String(productList.length));

});


  test("Remove all products from cart", async ({ page }) => {

  const productCards = page.locator(
    '[data-test="inventory-item"]'
  );

  await expect(productCards)
    .toHaveCount(productList.length);

  for (let i = 0; i < productList.length; i++) {

    await productCards
      .nth(i)
      .locator(".item-btn")
      .click();

  }

 
  await expect(
    page.locator('[data-test="shopping-cart-badge"]')
  ).toHaveText(String(productList.length));


  for (let i = 0; i < productList.length; i++) {

    await productCards
      .nth(i)
      .locator(".item-btn")
      .click();

  }

 
  await expect(
    page.locator('[data-test="shopping-cart-badge"]')
  ).toBeHidden();

});

  
  test("Open cart", async ({ page }) => {

    await page.locator(
      '[data-test="shopping-cart-link"]'
    ).click();

    await expect(page)
      .toHaveURL(/cart/);

  });

test("Open product details using image", async ({ page }) => {

  const firstProduct =
    page.locator('[data-test="inventory-item"]')
      .first();

  await firstProduct
    .locator('[data-test="item-img-link"]')
    .click();

  await expect(page)
    .toHaveURL(/inventory-item/);

});


});