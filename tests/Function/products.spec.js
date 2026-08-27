import { test, expect } from "../../fixtures/fixtures.js";
import products from "../../test-data/products.js";

const { LoginPage } = require("../../pages/LoginPage.js");

const productList = Object.values(products);

test.describe("Products Page Functional Tests", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
  });


  test("Open burger menu", async ({ productsPage }) => {
    await productsPage.openBurgerMenu();
    await expect(productsPage.sideMenu).toBeVisible();
  });


  test("Close burger menu", async ({ productsPage }) => {
    await productsPage.openBurgerMenu();
    await expect(productsPage.sideMenu).toBeVisible();
    await productsPage.closeBurgerMenu();
    await expect(productsPage.sidebarLinks).toBeHidden();
  });


  test("Add all products to cart", async ({ productsPage }) => {
    await expect(productsPage.products).toHaveCount(productList.length);
    await productsPage.addAllProducts();
    await expect(productsPage.cartBadge).toHaveText(String(productList.length));
  });


  test("Remove all products from cart", async ({ productsPage }) => {
    await expect(productsPage.products).toHaveCount(productList.length);
    await productsPage.addAllProducts();
    await expect(productsPage.cartBadge).toHaveText(String(productList.length));
    await productsPage.removeAllProducts();
    await expect(productsPage.cartBadge).toBeHidden();
  });


  test("Open cart", async ({ page, productsPage }) => {
    await productsPage.openCart();
    await expect(page).toHaveURL(/cart/);
  });


  test("Open product details", async ({ page, productsPage }) => {
    await productsPage.openFirstProduct();
    await expect(page).toHaveURL(/inventory-item/);
  });

});