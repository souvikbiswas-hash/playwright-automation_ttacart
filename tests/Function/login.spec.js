// @ts-check
import { test, expect } from '@playwright/test';

const BASEURL = 'https://app.thetestingacademy.com/playwright/ttacart/';

test('has title', async ({ page }) => {
  await page.goto(BASEURL);

  // Expect a title "to contain" a substring.
  await expect(page.locator('.tta-brand-title')).toHaveText("TTACart");
});

test.only('has username', async ({ page }) => {

  await page.goto(BASEURL);

  await expect(page.getByPlaceholder('Username')).toBeVisible();

});

// test('get started link', async ({ page }) => {
//   await page.goto(BASEURL);

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
