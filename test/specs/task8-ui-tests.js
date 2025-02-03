const LoginPage = require('../../Class_Library/LoginPage.js')
const { assert } = require('chai')
const Browser = require('../../Class_Library/Browser.js')
const { attachLogsToAllure } = require('../../logger.js')
const TextBox = require('../../Class_Library/TextBox.js')
const Button = require('../../Class_Library/Button.js')
const BaseElement = require('../../Class_Library/BaseElement.js')

describe('Swag Labs Login e2e', () => {
  const browserInstance = new Browser()
  const loginPage = new LoginPage('.login_wrapper', 'Login Form')
  beforeEach(async () => {
    await browserInstance.openUrl('https://www.saucedemo.com/')
  })
  after(async () => {
    attachLogsToAllure()
  })

  it('Should display all required page elements', async () => {
    assert.equal(await browserInstance.getUrl(), 'https://www.saucedemo.com/', 'should be on the login page')
    assert.isTrue(await loginPage.swagLabsHeader.isDisplayed(), 'Swag Labs header should be displayed')
    assert.isTrue(await loginPage.usernameField.isDisplayed(), 'username input field should be displayed')
    assert.isTrue(await loginPage.passwordField.isDisplayed(), 'password input field should be displayed')
    assert.isTrue(await loginPage.loginButton.isDisplayed(), 'login button should be displayed')
    assert.isTrue(await loginPage.loginButton.isEnabled(), 'login button should be enabled')
    assert.isTrue(await loginPage.credentialsBlock.isDisplayed(), 'block containing the valid credentials should be displayed')
  })
  it('Placeholder Text and Credentials Validation', async () => {
    assert.equal(await browserInstance.getUrl(), 'https://www.saucedemo.com/', 'should be on the login page')

    const credentialsBlockText = await loginPage.credentialsBlock.getText()
    const validUsernamesTextArray = await credentialsBlockText
      .split('\n')
      .filter((text) => !text.includes('Accepted usernames are:') && !text.includes('Password for all users:'))

    const passwordsText = await new TextBox('//div[@data-test="login-password"]', 'Credentils block passwords').getText()
    const validPasswordsTextArray = passwordsText.split('\n').filter((text) => !text.includes('Password for all users:'))

    const usernamePlaceholder = await loginPage.usernameField.getAttribute('placeholder')
    const passwordPlaceholder = await loginPage.passwordField.getAttribute('placeholder')
    const loginButtonText = await loginPage.loginButton.getAttribute('value')
    const loginButtonColor = await loginPage.loginButton.getCSSValue('background-color')

    //Placeholders and login button validation
    assert.equal(usernamePlaceholder, 'Username', 'Placeholder should be Username')
    assert.equal(passwordPlaceholder, 'Password', 'Placeholder should be Password')
    assert.equal(loginButtonText, 'Login')
    assert.equal(loginButtonColor.parsed['hex'], '#3ddc91', 'Login button wasnt green')
    //Credentials block validation
    assert.deepInclude(validUsernamesTextArray, 'standard_user', 'standard_user should be a part of the username pool')
    assert.deepInclude(validUsernamesTextArray, 'locked_out_user', 'locked_out_user should be a part of the username pool')
    assert.deepInclude(validUsernamesTextArray, 'problem_user', 'problem_user should be a part of the username pool')
    assert.deepInclude(validUsernamesTextArray, 'performance_glitch_user', 'performance_glitch_user should be a part of the username pool')
    assert.deepInclude(validUsernamesTextArray, 'visual_user')
    assert.deepInclude(validPasswordsTextArray, 'secret_sauce')
    assert.lengthOf(validPasswordsTextArray, 1)
  })
  it('Should display error message and icons and be removed when error message is closed', async () => {
    await loginPage.loginButton.click()

    assert.isTrue(await loginPage.checkAllErrorsDisplayed(), 'All error icons should be displayed when login button is clicked with empty fields')

    await loginPage.errorMessageExitButton.click()

    assert.isFalse(await loginPage.checkAllErrorsDisplayed(), 'All error icons should be gone after the exit button on error message is clicked')
  })
  it('Should not provide access to the inventory page without logging in first(Broken Access Control Validation)', async () => {
    await browserInstance.openUrl('https://www.saucedemo.com/inventory.html')

    assert.isTrue(
      await loginPage.errorMessage.isDisplayed(),
      'Error message should be displayed when trying to access restricted area of the app without login',
    )
    assert.equal(
      await loginPage.errorMessage.getText(),
      "Epic sadface: You can only access '/inventory.html' when you are logged in.",
      'Correct error message should be displayed',
    )
    assert.equal(await browserInstance.getUrl(), 'https://www.saucedemo.com/', 'Should not redirect from page')
  })
  it('Should login and redirect to product page when valid credentials are entered', async () => {
    await loginPage.login('performance_glitch_user', 'secret_sauce')

    const productsElement = await new BaseElement('//span[@data-test="title"]', 'Products Text')

    assert.equal(await browserInstance.getUrl(), 'https://www.saucedemo.com/inventory.html')
    assert.isTrue(await productsElement.isDisplayed(), 'Text "Products" should be displayed on the page')
    assert.equal(await productsElement.getText(), 'Products', 'Text "Products" should be displayed on the page')
  })
  it('Should display correct error message when username field is empty', async () => {
    await loginPage.login('', 'test')

    assert.isTrue(await loginPage.checkErrorMessageDisplayed(), 'Error message should be displayed when form is submited without username')
    assert.equal(
      await loginPage.errorMessage.getText(),
      'Epic sadface: Username is required',
      'should display correct error message when username field is empty',
    )
  })
  it('Should display correct error message when password field is empty', async () => {
    await loginPage.login('test', '')

    assert.isTrue(await loginPage.checkErrorMessageDisplayed(), 'Error message should be displayed when form is submited without password')
    assert.equal(
      await loginPage.errorMessage.getText(),
      'Epic sadface: Password is required',
      'should display correct error message when password field is empty',
    )
  })
  it('Should display correct error message when username field is empty', async () => {
    await loginPage.login('test', 'test')

    assert.isTrue(await loginPage.checkErrorMessageDisplayed(), 'Error message should be displayed when form is submited with invalid credentials')
    assert.equal(
      await loginPage.errorMessage.getText(),
      'Epic sadface: Username and password do not match any user in this service',
      'should display correct error message when incorrect credentials are submited',
    )
  })
})
