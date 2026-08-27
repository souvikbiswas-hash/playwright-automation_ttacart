import { test, expect } from "../../fixtures/fixtures.js";

const { LoginPage } = require("../../pages/LoginPage.js");


test.describe("Checkout Overview UI Tests", () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();

  });


  test("Show Checkout Overview title", async ({ checkoutOverviewPage }) => {

    await expect(checkoutOverviewPage.pageTitle) .toHaveText("Checkout: Overview");

  });


  test("Show product name", async ({ checkoutOverviewPage }) => {

    await expect(checkoutOverviewPage.productName.first()) .toBeVisible();
  });


  test("Show product price", async ({ checkoutOverviewPage }) => {

    await expect(checkoutOverviewPage.productPrice.first()) .toBeVisible();

  });


  test("Show subtotal", async ({ checkoutOverviewPage }) => {

    await expect(checkoutOverviewPage.subtotal) .toBeVisible();

  });


  test("Show tax", async ({ checkoutOverviewPage }) => {

    await expect(checkoutOverviewPage.tax) .toBeVisible();

  });


  test("Show total", async ({ checkoutOverviewPage }) => {

    await expect(checkoutOverviewPage.total) .toBeVisible();

  });


  test("Show Cancel button", async ({ checkoutOverviewPage }) => {

    await expect(checkoutOverviewPage.cancelButton) .toBeVisible();

  });


  test("Show Finish button", async ({ checkoutOverviewPage }) => {

    await expect(checkoutOverviewPage.finishButton) .toBeVisible();

  });

});