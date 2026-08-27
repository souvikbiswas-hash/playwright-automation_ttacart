import { test, expect } from "../../fixtures/fixtures.js";

const { LoginPage } = require("../../pages/LoginPage.js");


test.describe("Order Complete UI Tests", () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();

  });


  test("Show Order Complete title", async ({ orderCompletePage }) => {

    await expect(orderCompletePage.pageTitle) .toHaveText("Checkout: Complete!");

  });


  test("Show order confirmation message", async ({ orderCompletePage }) => {

    await expect(orderCompletePage.completeHeader) .toBeVisible();
  });


  test("Show confirmation text", async ({ orderCompletePage }) => {

    await expect(orderCompletePage.completeText) .toBeVisible();
  });


  test("Show Back Home button", async ({ orderCompletePage }) => {

    await expect(orderCompletePage.backHomeButton) .toBeVisible();

  });

});