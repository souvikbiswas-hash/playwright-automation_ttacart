// @ts-check
import { test, expect } from "@playwright/test";
import users from "../../test-data/user.js";

const BASE_URL = "https://app.thetestingacademy.com/playwright/ttacart/";


test("Show Login button", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator("#login-button").click(); 
});

test("Login", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator("#user-name").fill(users.standardUser.username);
  await page.locator("#password").fill(users.standardUser.password);
  await page.locator("#login-button").click();

  await expect(page).toHaveURL(/inventory/);
  await expect(page).toHaveTitle(/TTACart/);
});


