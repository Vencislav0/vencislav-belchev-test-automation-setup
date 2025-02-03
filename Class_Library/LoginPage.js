const BaseElement = require('./BaseElement.js')
const { logger } = require('../logger.js')
const BaseForm = require('./BaseForm.js')
const TextBox = require('./TextBox.js')
const Button = require('./Button.js')

class LoginPage extends BaseForm {
  constructor(selector, name) {
    super(selector, name)
    this.usernameField = new TextBox('//input[@data-test="username"]', 'Username Field')
    this.passwordField = new TextBox('//input[@data-test="password"]', 'Password Field')
    this.loginButton = new Button('//input[@data-test="login-button"]', 'Login Button')
    this.swagLabsHeader = new BaseElement('.login_logo', 'Swag Labs Header')
    this.credentialsBlock = new BaseElement('//div[@data-test="login-credentials-container"]', 'Credentials Block')
    this.errorMessage = new BaseElement('//h3[@data-test="error"]', 'Error Message')
    this.errorMessageExitButton = new Button('//button[@data-test="error-button"]/*[local-name()="svg"]', 'Error Message Exit Button')
    this.usernameErrorIcon = new Button(
      '//div[@class="form_group"]/input[@data-test="username"]/following-sibling::*[local-name()="svg"]',
      'Username Error Icon',
    )
    this.passwordErrorIcon = new Button(
      '//div[@class="form_group"]/input[@data-test="password"]/following-sibling::*[local-name()="svg"]',
      'Password Error Icon',
    )
  }

  async login(username, password) {
    await this.usernameField.sendText(username)
    await this.passwordField.sendText(password)
    await this.loginButton.click()
  }

  async checkErrorMessageDisplayed() {
    return await this.errorMessage.isDisplayed()
  }

  async checkErrorIconUsernameDisplayed() {
    return await this.usernameErrorIcon.isDisplayed()
  }

  async checkErrorIconPasswordDisplayed() {
    return await this.passwordErrorIcon.isDisplayed()
  }

  async checkAllErrorsDisplayed() {
    const errorMessage = this.errorMessage.isDisplayed()
    const usernameIcon = this.usernameErrorIcon.isDisplayed()
    const passwordIcon = this.passwordErrorIcon.isDisplayed()

    const results = await Promise.all([errorMessage, usernameIcon, passwordIcon])

    return results.every((result) => result)
  }

  async closeErrorMessage() {
    await this.errorMessageExitButton.click()
  }
}

module.exports = LoginPage
