// @ts-check
import { test, expect } from '@playwright/test';


const BASEURL = 'https://app.thetestingacademy.com/playwright/ttacart/';

test('show login page title', async ({ page }) => {
  await page.goto(BASEURL);

  
  await expect(page.locator('.tta-brand-title')).toHaveText("TTACart");
});

test('show username field', async ({ page }) => {

  await page.goto(BASEURL);

  await expect(page.locator('#user-name')).toBeVisible();

});

test('show password field', async ({ page }) => {

  await page.goto(BASEURL);

  await expect(page.locator('#password')).toBeVisible();

});

test("Show Login button", async ({ page }) => {
  await page.goto(BASEURL);

  await expect(page.locator("#login-button")).toHaveText("Login");
});


