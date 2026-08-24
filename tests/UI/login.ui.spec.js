import { test, expect } from '@playwright/test';

const { LoginPage } = require('../../pages/LoginPage.js');


test.describe('Login UI Tests', () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();

  });


  test('Show Login Page title', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await expect(loginPage.pageTitle)
      .toHaveText('TTACart');

  });


  test('Show username field', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await expect(loginPage.usernameInput)
      .toBeVisible();

  });


  test('Show password field', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await expect(loginPage.passwordInput)
      .toBeVisible();

  });


  test('Verify Login button', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await expect(loginPage.loginButton)
      .toBeVisible();

    await expect(loginPage.loginButton)
      .toHaveText('Login');

  });

});