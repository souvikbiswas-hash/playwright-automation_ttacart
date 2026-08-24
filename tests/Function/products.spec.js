import { test, expect } from '@playwright/test';

import users from '../../test-data/user.js';
import products from '../../test-data/products.js';

const { LoginPage } = require('../../pages/LoginPage.js');
const { ProductsPage } = require('../../pages/ProductsPage.js');

const productList = Object.values(products);

test.describe("Products Page Functional Tests", () => {


 test.beforeEach(async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.open();

  await loginPage.login(
    users.standardUser.username,
    users.standardUser.password
  );

  await expect(page)
    .toHaveURL(/inventory/);

});


  test("Open burger menu", async ({ page }) => {

  const productsPage = new ProductsPage(page);

  await productsPage.openBurgerMenu();

  await expect(
    productsPage.sideMenu
  ).toBeVisible();

});


  test("Close burger menu", async ({ page }) => {

  const productsPage = new ProductsPage(page);

  await productsPage.openBurgerMenu();

  await expect(
    productsPage.sideMenu
  ).toBeVisible();

  await productsPage.closeBurgerMenu();

  await expect(
    productsPage.sidebarLinks
  ).toBeHidden();

});

  test("Add all products to cart", async ({ page }) => {

  const productsPage = new ProductsPage(page);

  await expect(productsPage.products)
    .toHaveCount(productList.length);

  await productsPage.addAllProducts();

  await expect(productsPage.cartBadge)
    .toHaveText(String(productList.length));

});

  test("Remove all products from cart", async ({ page }) => {

  const productsPage = new ProductsPage(page);

  await expect(productsPage.products)
    .toHaveCount(productList.length);

  await productsPage.addAllProducts();

  await expect(productsPage.cartBadge)
    .toHaveText(String(productList.length));

  await productsPage.removeAllProducts();

  await expect(productsPage.cartBadge)
    .toBeHidden();

});

  
  test("Open cart", async ({ page }) => {

  const productsPage = new ProductsPage(page);

  await productsPage.openCart();

  await expect(page)
    .toHaveURL(/cart/);

});

test("Open product details using image", async ({ page }) => {

  const productsPage = new ProductsPage(page);

  await productsPage.openFirstProductUsingImage();

  await expect(page)
    .toHaveURL(/inventory-item/);

});

});