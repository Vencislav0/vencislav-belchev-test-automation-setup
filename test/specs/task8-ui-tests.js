const LoginPage = require('../../pages/LoginPage.js')
const InventoryPage = require('../../pages/InventoryPage.js')
const { assert } = require('chai')
const Browser = require('../../framework/Browser.js')
const logger = require('../../logger.js')

describe('Swag Labs Login e2e', () => {
  const browserInstance = new Browser()
  const loginPage = new LoginPage()
  const inventoryPage = new InventoryPage()
  beforeEach(async () => {
    await browserInstance.openUrl('https://www.saucedemo.com/')
  })

  it('Should display all required page elements', async () => {
    assert.equal(await browserInstance.getUrl(), 'https://www.saucedemo.com/', 'should be on the login page')
    logger.logStep('Verified URL is correct')

    assert.isTrue(await loginPage.isVisible())
    logger.logStep('Verified login form is visible')

    assert.isTrue(await loginPage.isHeaderDisplayed(), 'Swag Labs header should be displayed')
    logger.logStep('verified Swag Labs header is displayed')

    assert.equal(await loginPage.getHeaderText(), 'Swag Labs', 'Header text should be "Swag Labs"')
    logger.logStep('Verified text of Swag Labs header')

    assert.isTrue(await loginPage.isUsernameFieldDisplayed(), 'username input field should be displayed')
    logger.logStep('Verified that the username field is displayed')

    assert.isTrue(await loginPage.isPasswordFieldDisplayed(), 'password input field should be displayed')
    logger.logStep('Verified that the password field is displayed')

    assert.isTrue(await loginPage.isLoginButtonDisplayed(), 'login button should be displayed')
    logger.logStep('Verified that the login button is displayed')

    assert.isTrue(await loginPage.isLoginButtonEnabled(), 'login button should be enabled')
    logger.logStep('Verified that the login button is enabled')

    assert.isTrue(await loginPage.isCredentialsBlockDisplayed(), 'block containing the valid credentials should be displayed')
    logger.logStep('Verified that the Credentials block is displayed')

    logger.logStep('Checking all elements complete')
  })
  it('Placeholder Text and Credentials Validation', async () => {
    assert.equal(await browserInstance.getUrl(), 'https://www.saucedemo.com/', 'should be on the login page')
    logger.logStep('Verified URL is correct')

    logger.logStep('Getting usernames from credentials block')
    const credentialsBlockText = await loginPage.getUsernameBlockText()
    const validUsernamesTextArray = await credentialsBlockText.split('\n').filter((text) => !text.includes('Accepted usernames are:'))

    logger.logStep('Getting passwords from credentials block')
    const passwordsText = await loginPage.getPasswordBlockText()
    const validPasswordsTextArray = passwordsText.split('\n').filter((text) => !text.includes('Password for all users:'))

    logger.logStep('Getting placeholders for username and password fields')
    const usernamePlaceholder = await loginPage.getUsernamePlaceholder()
    const passwordPlaceholder = await loginPage.getPasswordPlaceholder()

    logger.logStep('Getting login button text and color')
    const loginButtonText = await loginPage.getLoginButtonValue()
    const loginButtonColor = await loginPage.getLoginButtonColor()

    logger.logStep('Placeholders and login button validation')
    assert.equal(usernamePlaceholder, 'Username', 'Placeholder should be Username')
    assert.equal(passwordPlaceholder, 'Password', 'Placeholder should be Password')
    assert.equal(loginButtonText, 'Login')
    assert.equal(loginButtonColor.parsed['hex'], '#3ddc91', 'Login button wasnt green')

    logger.logStep('Credentials block validation')
    assert.deepInclude(validUsernamesTextArray, 'standard_user', 'standard_user should be a part of the username pool')
    assert.deepInclude(validUsernamesTextArray, 'locked_out_user', 'locked_out_user should be a part of the username pool')
    assert.deepInclude(validUsernamesTextArray, 'problem_user', 'problem_user should be a part of the username pool')
    assert.deepInclude(validUsernamesTextArray, 'performance_glitch_user', 'performance_glitch_user should be a part of the username pool')
    assert.deepInclude(validUsernamesTextArray, 'visual_user', 'visual_user should be a part of the username pool')
    assert.deepInclude(validPasswordsTextArray, 'secret_sauce', 'secret_sauce should be a part of the password pool')
    assert.lengthOf(validPasswordsTextArray, 1, 'Password pool should contain only "secret_sauce" password for all accounts')

    logger.logStep('Test Complete')
  })
  it('Should display error message and icons and be removed when error message is closed', async () => {
    logger.logStep('Submiting empty login form')
    await loginPage.submit()

    logger.logStep('Verifying that all error messages are displayed')
    assert.isTrue(await loginPage.isErrorIconUsernameDisplayed(), 'Username error icon should be displayed')
    assert.isTrue(await loginPage.isErrorIconPasswordDisplayed(), 'Password error icon should be displayed')
    assert.isTrue(await loginPage.isErrorMessageDisplayed(), 'Error message should be displayed')

    logger.logStep('Clicking error message exist button to close the errors')
    await loginPage.clickErrorMessageExitButton()

    logger.logStep('Verifying that the error messages are gone')
    assert.isFalse(await loginPage.isErrorIconUsernameDisplayed(), 'Username error icon should not be be displayed after error message is closed')
    assert.isFalse(await loginPage.isErrorIconPasswordDisplayed(), 'Password error icon should not be displayed after error message is closed')
    assert.isFalse(await loginPage.isErrorMessageDisplayed(), 'Erroe message should not be displayed after error message is closed')

    logger.logStep('Test Complete')
  })
  it('Should not provide access to the inventory page without logging in first(Broken Access Control Validation)', async () => {
    logger.logStep('Opening inventory page without login')
    await browserInstance.openUrl('https://www.saucedemo.com/inventory.html')

    logger.logStep('Veryfing that an error message is displayed')
    assert.isTrue(await loginPage.isErrorMessageDisplayed(), 'Error message should be displayed when trying to access restricted area of the app without login')
    logger.logStep('Verifying the text of the error message')
    assert.equal(
      await loginPage.getErrorMessageText(),
      "Epic sadface: You can only access '/inventory.html' when you are logged in.",
      'Correct error message should be displayed',
    )

    logger.logStep('Verifying that the page is still the login from page')
    assert.equal(await browserInstance.getUrl(), 'https://www.saucedemo.com/', 'Should not redirect from page')
  })
  it('Should login and redirect to product page when valid credentials are entered', async () => {
    logger.logStep('Logging with valid credentials')
    await loginPage.login('performance_glitch_user', 'secret_sauce')

    logger.logStep('Verifying redirection to inventory page')
    assert.equal(await browserInstance.getUrl(), 'https://www.saucedemo.com/inventory.html')

    logger.logStep('Verifying that the Inventory container is displayed')
    assert.isTrue(await inventoryPage.isVisible(), 'Inventory container should be visible on the page')

    logger.logStep('Verifying that Products element is displayed')
    assert.isTrue(await inventoryPage.isProductsElementDisplayed(), 'Text "Products" should be displayed on the page')

    logger.logStep('Verifying text inside Products element')
    assert.equal(await inventoryPage.getProductsElementText(), 'Products', 'Text "Products" should be displayed on the page')
  })
  it('Should display correct error message when username field is empty', async () => {
    logger.logStep('Submiting form with empty username field')
    await loginPage.enterPassword('test')
    await loginPage.submit()

    logger.logStep('Verifying that an error message is displayed')
    assert.isTrue(await loginPage.isErrorMessageDisplayed(), 'Error message should be displayed when form is submited without username')

    logger.logStep('Verifying error message text')
    assert.equal(
      await loginPage.getErrorMessageText(),
      'Epic sadface: Username is required',
      'should display correct error message when username field is empty',
    )
  })
  it('Should display correct error message when password field is empty', async () => {
    logger.logStep('Submiting form with empty password field')
    await loginPage.enterUsername('test')
    await loginPage.submit()

    logger.logStep('Verifying that an error message is displayed')
    assert.isTrue(await loginPage.isErrorMessageDisplayed(), 'Error message should be displayed when form is submited without password')

    logger.logStep('Verifying error message text')
    assert.equal(
      await loginPage.getErrorMessageText(),
      'Epic sadface: Password is required',
      'should display correct error message when password field is empty',
    )
  })
  it('Should display correct error message when invalid credentials are submited', async () => {
    logger.logStep('Attempt Login with invalid credentials')
    await loginPage.login('test', 'test')

    logger.logStep('Verifying that error is displayed')
    assert.isTrue(await loginPage.isErrorMessageDisplayed(), 'Error message should be displayed when form is submited with invalid credentials')

    logger.logStep('Verifying error message text')
    assert.equal(
      await loginPage.getErrorMessageText(),
      'Epic sadface: Username and password do not match any user in this service',
      'should display correct error message when incorrect credentials are submited',
    )
  })
})
