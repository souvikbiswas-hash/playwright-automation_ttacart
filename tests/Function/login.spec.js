import { test, expect } from '@playwright/test';

import users from '../../test-data/user.js';

const BASE_URL =
  'https://app.thetestingacademy.com/playwright/ttacart/';


test.describe('Login Functional Tests', () => {


  test('Valid login', async ({ page }) => {

    await page.goto(BASE_URL);

    await page.locator('#user-name')
      .fill(users.standardUser.username);

    await page.locator('#password')
      .fill(users.standardUser.password);

    await page.locator('#login-button')
      .click();

    await expect(page).toHaveURL(/inventory/);

  });


  test('Invalid Login for invalid username', async ({ page }) => {

    await page.goto(BASE_URL);

    await page.locator('#user-name')
      .fill('invalid_user');

    await page.locator('#password')
      .fill(users.standardUser.password);

    await page.locator('#login-button')
      .click();

    await expect(
      page.locator('#login-error')
    ).toBeVisible();

  });


  test('Invalid Login for invalid password', async ({ page }) => {

    await page.goto(BASE_URL);

    await page.locator('#user-name')
      .fill(users.standardUser.username);

    await page.locator('#password')
      .fill('wrong_password');

    await page.locator('#login-button')
      .click();

    await expect(
      page.locator('#login-error')
    ).toBeVisible();

  });

  test('Invalid Login for invalid username and password', async ({ page }) => {

    await page.goto(BASE_URL);

    await page.locator('#user-name')
      .fill('invalid_user');

    await page.locator('#password')
      .fill('wrong_password');

    await page.locator('#login-button')
      .click();

    await expect(
      page.locator('#login-error')
    ).toBeVisible();

  });


  test('Locked user', async ({ page }) => {

    await page.goto(BASE_URL);

    await page.locator('#user-name')
      .fill(users.lockedUser.username);

    await page.locator('#password')
      .fill(users.lockedUser.password);

    await page.locator('#login-button')
      .click();

    await expect(
      page.locator('#login-error')
    ).toBeVisible();

  });

});