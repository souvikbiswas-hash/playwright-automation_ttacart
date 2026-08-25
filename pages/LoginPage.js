class LoginPage {

  constructor(page) {

    this.page = page;

    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.errorMessage = page.locator("#login-error");
    this.loginHint = page.locator(".login-hint");
    this.pageTitle = page.locator(".tta-brand-title");
  }

  async open() {

    await this.page.goto("https://app.thetestingacademy.com/playwright/ttacart/");

  }

  async login(username, password) {

    await this.usernameInput .fill(username);
    await this.passwordInput .fill(password);
    await this.loginButton .click();

  }

}

module.exports = { LoginPage };