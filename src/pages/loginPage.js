class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input#input-0.v-field__input');
    this.passwordInput = page.locator('input#input-2.v-field__input');
    this.loginButton = page.locator('button[data-v-397d1e1e][type="button"]');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = LoginPage;