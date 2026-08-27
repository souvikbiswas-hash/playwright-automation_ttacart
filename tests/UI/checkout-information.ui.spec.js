import { test, expect } from "../../fixtures/fixtures.js";

const { LoginPage } = require("../../pages/LoginPage.js");


test.describe("Checkout Information UI Tests", () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
  });


  test("Show Checkout Information title", async ({ checkoutInformationPage }) => {
    await expect(checkoutInformationPage.pageTitle).toHaveText("Checkout: Your Information");
  });


  test("Show First Name field", async ({ checkoutInformationPage }) => {
    await expect(checkoutInformationPage.firstName).toBeVisible();
  });


  test("Show Last Name field", async ({ checkoutInformationPage }) => {
    await expect(checkoutInformationPage.lastName).toBeVisible();
  });


  test("Show Postal Code field", async ({ checkoutInformationPage }) => {
    await expect(checkoutInformationPage.postalCode).toBeVisible();
  });


  test("Show Cancel button", async ({ checkoutInformationPage }) => {
    await expect(checkoutInformationPage.cancelButton).toBeVisible();
  });


  test("Show Continue button", async ({ checkoutInformationPage }) => {
    await expect(checkoutInformationPage.continueButton).toBeVisible();
  });

});