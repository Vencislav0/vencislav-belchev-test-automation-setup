const BaseElement = require('../framework/BaseElement.js')
const logger = require('../logger.js')
const BaseForm = require('../framework/BaseForm.js')
const TextBox = require('../framework/TextBox.js')
const Button = require('../framework/Button.js')

class LoginPage extends BaseForm {
  constructor() {
    super('.login_wrapper', 'Login Form')
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
    this.passwordsBlock = new TextBox('//div[@data-test="login-password"]', 'Credentials block passwords')
    this.usernamesBlock = new TextBox('//div[@data-test="login-credentials"]', 'Credentials block usernames')
  }

  async login(username, password) {
    await this.usernameField.sendText(username)
    await this.passwordField.sendText(password)
    await this.loginButton.click()
  }
  async enterPassword(password){
    await this.passwordField.sendText(password)
  }
  async enterUsername(username){
    await this.usernameField.sendText(username)
  }
  async submit(){
    await this.loginButton.click()
  }

  async isErrorMessageDisplayed() {
    return this.errorMessage.isDisplayed()
  }

  async isErrorIconUsernameDisplayed() {
    return this.usernameErrorIcon.isDisplayed()
  }

  async isErrorIconPasswordDisplayed() {
    return this.passwordErrorIcon.isDisplayed()
  }
  async getErrorMessageText(){
    return this.errorMessage.getText()
  }
  async clickErrorMessageExitButton(){
    await this.errorMessageExitButton.click()
  }
  

  async closeErrorMessage() {
    await this.errorMessageExitButton.click()
  }
  async getUsernamePlaceholder(){
    return this.usernameField.getAttribute('placeholder')
  }
  async getPasswordPlaceholder(){
    return this.passwordField.getAttribute('placeholder')
  }
  async getLoginButtonValue(){
    return this.loginButton.getValue()
  }
  async getLoginButtonColor(){
    return this.loginButton.getCSSValue('background-color')
  }
  async getUsernameBlockText(){
    return this.usernamesBlock.getText()
  }
  async getPasswordBlockText(){
    return this.passwordsBlock.getText()
  }
  async isHeaderDisplayed(){
    return this.swagLabsHeader.isDisplayed()
  }
  async getHeaderText(){
    return this.swagLabsHeader.getText()
  }
  async isUsernameFieldDisplayed(){
    return this.usernameField.isDisplayed()
  }
  async isPasswordFieldDisplayed(){
    return this.passwordField.isDisplayed()
  }
  async isLoginButtonDisplayed(){
    return this.loginButton.isDisplayed()
  }
  async isCredentialsBlockDisplayed(){
    return this.credentialsBlock.isDisplayed()
  }
  async isLoginButtonEnabled(){
    return this.loginButton.isEnabled()
  }
}

module.exports = LoginPage
