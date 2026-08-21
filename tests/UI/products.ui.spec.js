// @ts-check
import { test, expect } from "@playwright/test";

import users from "../../test-data/user.js";
const BASEURL = "https://app.thetestingacademy.com/playwright/ttacart/";

test.describe("Login Page UI Tests", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BASEURL);
        await page.locator("#user-name").fill(users.standardUser.username);
        await page.locator("#password").fill(users.standardUser.password);
        await page.locator("#login-button").click();
    });
    test("Show burger menu", async ({ page }) => {


        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator("//button[@id='react-burger-menu-btn']//*[name()='svg']")).toBeVisible();
    });

    test("Show page Title", async ({ page }) => {
        

        await expect(page.locator(".tta-brand-title")).toHaveText(/TTACart/);
    });

    test("Show Cart button", async ({ page }) => {
        

        await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
    });

    test("Show Products Title", async ({ page }) => {
        

        await expect(page.locator(".page-title")).toHaveText("Products");
    });

    test("Show Filter button", async ({ page }) => {
        

        await expect(page.locator(".sort-wrap")).toBeVisible();
    });
});
