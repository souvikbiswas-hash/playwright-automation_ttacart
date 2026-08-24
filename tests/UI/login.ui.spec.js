import { test, expect } from '@playwright/test';

const BASE_URL =
  'https://app.thetestingacademy.com/playwright/ttacart/';

test.describe('Login UI Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Show Login Page title', async ({ page }) => {

    await expect(page.locator('.tta-brand-title'))
      .toHaveText('TTACart');

  });

  test('Show username field', async ({ page }) => {
    await expect(
      page.locator('#user-name')
    ).toBeVisible();
  });

  test('Show password field', async ({ page }) => {
    await expect(
      page.locator('#password')
    ).toBeVisible();
  });

  test('Verify Login button', async ({ page }) => {
    await expect(
      page.locator('#login-button')
    ).toBeVisible();

    await expect(
      page.locator('#login-button')
    ).toHaveText('Login');
  });

});