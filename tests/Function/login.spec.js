// @ts-check
import { test, expect } from "@playwright/test";
import users from "../../test-data/user.js";

const BASE_URL = "https://app.thetestingacademy.com/playwright/ttacart/";


test("Click Login button", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator("#login-button").click(); 
});

test("Valid Login", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator("#user-name").fill(users.standardUser.username);
  await page.locator("#password").fill(users.standardUser.password);
  await page.locator("#login-button").click();

  await expect(page).toHaveURL(/inventory/);
  await expect(page).toHaveTitle(/TTACart/);
});

test("Invalid Login invalid-user", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator("#user-name").fill("invalid_user");
  await page.locator("#password").fill(users.standardUser.password);
  await page.locator("#login-button").click();

  await expect(page.locator("#login-error")).toContainText(
    "Epic sadface: Username and password do not match any user in this service"
  );
}); 

test("Invalid Login invalid-password", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator("#user-name").fill(users.standardUser.username);
  await page.locator("#password").fill("invalid_password");
  await page.locator("#login-button").click();

  await expect(page.locator("#login-error")).toContainText(
    "Epic sadface: Username and password do not match any user in this service"
  );
}); 

test("Invalid Login invalid-user&invalid-password", async ({ page }) => {
  await page.goto(BASE_URL);

  await page.locator("#user-name").fill("invalid_user");
  await page.locator("#password").fill("invalid_password");
  await page.locator("#login-button").click();

  await expect(page.locator("#login-error")).toContainText(
    "Epic sadface: Username and password do not match any user in this service"
  );
}); 


