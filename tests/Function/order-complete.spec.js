import { test, expect } from "@playwright/test";
import users from "../../test-data/user.js";

const { LoginPage } = require("../../pages/LoginPage.js");
const { ProductsPage } = require("../../pages/ProductsPage.js");
const { ProductDetailsPage } = require("../../pages/ProductDetailsPage.js");
const { CartPage } = require("../../pages/CartPage.js");
const { CheckoutInformationPage } = require("../../pages/CheckoutInformationPage.js");
const { CheckoutOverviewPage } = require("../../pages/CheckoutOverviewPage.js");
const { OrderCompletePage } = require("../../pages/OrderCompletePage.js");

test.describe("Order Complete Functional Tests", () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);
    const checkoutInformationPage = new CheckoutInformationPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);

    await loginPage.open();
    await loginPage.login( users.standardUser.username, users.standardUser.password );
    await expect(page) .toHaveURL(/inventory/);
    await productsPage.openFirstProduct();
    await productDetailsPage.addToCart();
    await productDetailsPage.openCart();
    await expect(page) .toHaveURL(/cart/);
    await cartPage.checkout();
    await expect(page) .toHaveURL(/checkout-step-one/);
    await checkoutInformationPage.fillCustomerInformation(
      users.standardUser.checkout.firstName,
      users.standardUser.checkout.lastName,
      users.standardUser.checkout.postalCode
    );
    await checkoutInformationPage.continueToOverview();
    await expect(page) .toHaveURL(/checkout-step-two/);
    await checkoutOverviewPage.finishOrder();
    await expect(page) .toHaveURL(/checkout-complete/);

  });

  test("Return to Products using Back Home", async ({ page }) => {

    const orderCompletePage = new OrderCompletePage(page);

    await orderCompletePage.backToProducts();
    await expect(page) .toHaveURL(/inventory/);

  });

});