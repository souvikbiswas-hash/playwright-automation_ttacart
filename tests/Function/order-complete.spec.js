import { test, expect } from "../../fixtures/fixtures.js";

const { LoginPage } = require("../../pages/LoginPage.js");


test.describe("Order Complete Functional Tests", () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();

  });


  test("Return to Products using Back Home", async ({ page, orderCompletePage }) => {

    await orderCompletePage.backToProducts();

    await expect(page).toHaveURL(/inventory/);

  });

});