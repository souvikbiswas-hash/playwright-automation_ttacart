import { test as base, expect } from '@playwright/test';
import users from '../test-data/user.js';

const { LoginPage } = require('../pages/LoginPage.js');
const { ProductsPage } = require('../pages/ProductsPage.js');
const { ProductDetailsPage } = require('../pages/ProductDetailsPage.js');
const { CartPage } = require('../pages/CartPage.js');
const { CheckoutInformationPage } = require('../pages/CheckoutInformationPage.js');
const { CheckoutOverviewPage } = require('../pages/CheckoutOverviewPage.js');
const { OrderCompletePage } = require('../pages/OrderCompletePage.js');

export const test = base.extend({

  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await expect(page).toHaveURL(/inventory/);
    await use(page);
  },

  productsPage: async ({ loggedInPage }, use) => {
    const productsPage = new ProductsPage(loggedInPage);
    await use(productsPage);
  },

  productDetailsPage: async ({ loggedInPage }, use) => {
    const productsPage = new ProductsPage(loggedInPage);
    const productDetailsPage = new ProductDetailsPage(loggedInPage);
    await productsPage.openFirstProduct();
    await expect(loggedInPage).toHaveURL(/inventory-item/);
    await use(productDetailsPage);
  },

  cartPage: async ({ loggedInPage }, use) => {
    const productsPage = new ProductsPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);
    await productsPage.addFirstProduct();
    await productsPage.openCart();
    await expect(loggedInPage).toHaveURL(/cart/);
    await use(cartPage);
  },

  checkoutInformationPage: async ({ cartPage }, use) => {
    const checkoutInformationPage = new CheckoutInformationPage(cartPage.page);
    await cartPage.checkout();
    await use(checkoutInformationPage);
  },

  checkoutOverviewPage: async ({ checkoutInformationPage }, use) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(checkoutInformationPage.page);
    await checkoutInformationPage.fillCustomerInformation(users.standardUser.checkout.firstName, users.standardUser.checkout.lastName, users.standardUser.checkout.postalCode);
    await checkoutInformationPage.continueToOverview();
    await use(checkoutOverviewPage);
  },

  orderCompletePage: async ({ checkoutOverviewPage }, use) => {
    const orderCompletePage = new OrderCompletePage(checkoutOverviewPage.page);
    await checkoutOverviewPage.finishOrder();
    await use(orderCompletePage);
  }

});

export { expect };