const Page = require('./basePage.js')

class LoginPage extends Page {
  get usernameInput() {
    return $('//input[@data-test="username"]')
  }

  get passwordInput() {
    return $('//input[@data-test="password"]')
  }

  get swagLabsHeader() {
    return $('.login_logo')
  }

  get loginButton() {
    return $('//input[@data-test="login-button"]')
  }

  get credentialsBlock() {
    return $('//div[@data-test="login-credentials-container"]')
  }

  get errorMessage() {
    return $('//h3[@data-test="error"]')
  }

  async login(username, password) {
    await this.usernameInput.setValue(username)
    await this.passwordInput.setValue(password)
    await this.loginButton.click()
  }
}

module.exports = new LoginPage()
