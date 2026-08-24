class LoginPage {

  constructor(page) {

    this.page = page;

    this.username =
      page.locator('#user-name');

    this.password =
      page.locator('#password');

    this.loginButton =
      page.locator('#login-button');

    this.errorMessage =
      page.locator('#login-error');

    this.loginHint =
      page.locator('.login-hint');
  }


  async open() {

    await this.page.goto(
      'https://app.thetestingacademy.com/playwright/ttacart/'
    );

  }


  async login(username, password) {

    await this.username.fill(username);

    await this.password.fill(password);

    await this.loginButton.click();
  }

}


module.exports = { LoginPage };