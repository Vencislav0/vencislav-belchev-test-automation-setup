const LoginPage = require('./pages/loginPage.js')
const { assert } = require('chai')

describe('Swag Labs Login e2e', () => {
  beforeEach(async () => {
    await LoginPage.open()
  })
  it('Should display all required page elements', async () => {
    assert.equal(await browser.getUrl(), 'https://www.saucedemo.com/', 'should be on the login page')
    assert.isTrue(await LoginPage.swagLabsHeader.isDisplayed(), 'Swag Labs header should be displayed')
    assert.isTrue(await LoginPage.usernameInput.isDisplayed(), 'username input field should be displayed')
    assert.isTrue(await LoginPage.passwordInput.isDisplayed(), 'password input field should be displayed')
    assert.isTrue(await LoginPage.loginButton.isDisplayed(), 'login button should be displayed')
    assert.isTrue(await LoginPage.loginButton.isEnabled(), 'login button should be enabled')
    assert.isTrue(await LoginPage.credentialsBlock.isDisplayed(), 'block containing the valid credentials should be displayed')
  })
  it.only('Placeholder Text and Credentials Validation', async () => {
    assert.equal(await browser.getUrl(), 'https://www.saucedemo.com/', 'should be on the login page')

    const credentialsBlockText = await LoginPage.credentialsBlock.getText()
    const validUsernamesTextArray = await credentialsBlockText
      .split('\n')
      .filter((text) => !text.includes('Accepted usernames are:') && !text.includes('Password for all users:'))

    const passwordsText = await $('//div[@data-test="login-password"]').getText()
    const validPasswordsTextArray = passwordsText.split('\n').filter((text) => !text.includes('Password for all users:'))

    const usernamePlaceholder = await LoginPage.usernameInput.getAttribute('placeholder')
    const passwordPlaceholder = await LoginPage.passwordInput.getAttribute('placeholder')
    const loginButtonText = await LoginPage.loginButton.getAttribute('value')
    const loginButtonColor = await LoginPage.loginButton.getCSSProperty('background-color')

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
    await LoginPage.loginButton.click()

    const usernameErrorIcon = await $('//div[@class="form_group"]/input[@data-test="username"]/following-sibling::*[local-name()="svg"]')
    const passwordErrorIcon = await $('//div[@class="form_group"]/input[@data-test="password"]/following-sibling::*[local-name()="svg"]')
    const errorMessageExitButton = await $('//button[@data-test="error-button"]/*[local-name()="svg"]')

    assert.isTrue(await LoginPage.errorMessage.isDisplayed(), 'Error message should be displayed when invalid credentials are entered')
    assert.isTrue(await usernameErrorIcon.isDisplayed(), 'Error icon on username should be displayed when invalid credentials are entered')
    assert.isTrue(await passwordErrorIcon.isDisplayed(), 'Error icon on username should be displayed when invalid credentials are entered')

    await errorMessageExitButton.click()

    assert.isFalse(await LoginPage.errorMessage.isDisplayed(), 'Error message should disappear when error message is closed')
    assert.isFalse(await usernameErrorIcon.isDisplayed(), 'Error icon on username should disappear when error message is closed')
    assert.isFalse(await passwordErrorIcon.isDisplayed(), 'Error icon on username should disappear when error message is closed')
  })
  it('should login and redirect to product page when valid credentials are entered', async () => {
    await LoginPage.login('performance_glitch_user', 'secret_sauce')

    const productsElement = await $('//span[@data-test="title"]')

    assert.equal(await browser.getUrl(), 'https://www.saucedemo.com/inventory.html')
    assert.isTrue(await productsElement.isDisplayed(), 'Text "Products" should be displayed on the page')
    assert.equal(await productsElement.getText(), 'Products', 'Text "Products" should be displayed on the page')
  })
})
