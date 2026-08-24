import { test, expect } from '@playwright/test';

import users from '../../test-data/user.js';

const { LoginPage } = require('../../pages/LoginPage.js');

test.describe('Login Functional Tests', () => {

  test('Valid login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();

    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );

    await expect(page).toHaveURL(/inventory/);

  });


  test('Invalid Login for invalid username', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();

    await loginPage.login(
      'invalid_user',
      users.standardUser.password
    );

    await expect(
      loginPage.errorMessage
    ).toBeVisible();

  });


  test('Invalid Login for invalid password', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();

    await loginPage.login(
      users.standardUser.username,
      'wrong_password'
    );

    await expect(
      loginPage.errorMessage
    ).toBeVisible();

  });


  test('Invalid Login for invalid username and password', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();

    await loginPage.login(
      'invalid_user',
      'wrong_password'
    );

    await expect(
      loginPage.errorMessage
    ).toBeVisible();

  });


  test('Locked user', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();

    await loginPage.login(
      users.lockedUser.username,
      users.lockedUser.password
    );

    await expect(
      loginPage.errorMessage
    ).toBeVisible();

  });

});