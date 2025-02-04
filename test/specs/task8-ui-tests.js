const LoginPage = require('../../pages/LoginPage.js')
const InventoryPage = require('../../pages/InventoryPage.js')
const { assert } = require('chai')
const Browser = require('../../framework/Browser.js')




describe('Swag Labs Login e2e', () => {
  const browserInstance = new Browser()
  const loginPage = new LoginPage()
  const inventoryPage = new InventoryPage()
  beforeEach(async () => {
    await browserInstance.openUrl('https://www.saucedemo.com/')   
  })
  
  it('Should display all required page elements', async () => {
    assert.equal(await browserInstance.getUrl(), 'https://www.saucedemo.com/', 'should be on the login page')
    assert.isTrue(await loginPage.isVisible())
    assert.isTrue(await loginPage.isHeaderDisplayed(), 'Swag Labs header should be displayed')
    assert.equal(await loginPage.getHeaderText(), 'Swag Labs', 'Header text should be "Swag Labs"')
    assert.isTrue(await loginPage.isUsernameFieldDisplayed(), 'username input field should be displayed')
    assert.isTrue(await loginPage.isPasswordFieldDisplayed(), 'password input field should be displayed')
    assert.isTrue(await loginPage.isLoginButtonDisplayed(), 'login button should be displayed')
    assert.isTrue(await loginPage.isLoginButtonEnabled(), 'login button should be enabled')
    assert.isTrue(await loginPage.isCredentialsBlockDisplayed(), 'block containing the valid credentials should be displayed')
  })
  it('Placeholder Text and Credentials Validation', async () => {
    assert.equal(await browserInstance.getUrl(), 'https://www.saucedemo.com/', 'should be on the login page')

    const credentialsBlockText = await loginPage.getUsernameBlockText()
    const validUsernamesTextArray = await credentialsBlockText
      .split('\n')
      .filter((text) => !text.includes('Accepted usernames are:'))

    const passwordsText = await loginPage.getPasswordBlockText()
    const validPasswordsTextArray = passwordsText.split('\n').filter((text) => !text.includes('Password for all users:'))

    const usernamePlaceholder = await loginPage.getUsernamePlaceholder()
    const passwordPlaceholder = await loginPage.getPasswordPlaceholder()
    const loginButtonText = await loginPage.getLoginButtonValue()
    const loginButtonColor = await loginPage.getLoginButtonColor()

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
    assert.deepInclude(validUsernamesTextArray, 'visual_user', 'visual_user should be a part of the username pool')
    assert.deepInclude(validPasswordsTextArray, 'secret_sauce', 'secret_sauce should be a part of the password pool')
    assert.lengthOf(validPasswordsTextArray, 1, 'Password pool should contain only "secret_sauce" password for all accounts')
  })
  it('Should display error message and icons and be removed when error message is closed', async () => {
    await loginPage.submit()

    assert.isTrue(await loginPage.isErrorIconUsernameDisplayed(), 'Username error icon should be displayed')
    assert.isTrue(await loginPage.isErrorIconPasswordDisplayed(), 'Password error icon should be displayed')
    assert.isTrue(await loginPage.isErrorMessageDisplayed(), 'Error message should be displayed')

    await loginPage.clickErrorMessageExitButton()

    assert.isFalse(await loginPage.isErrorIconUsernameDisplayed(), 'Username error icon should not be be displayed after error message is closed')
    assert.isFalse(await loginPage.isErrorIconPasswordDisplayed(), 'Password error icon should not be displayed after error message is closed')
    assert.isFalse(await loginPage.isErrorMessageDisplayed(), 'Erroe message should not be displayed after error message is closed')
  })
  it('Should not provide access to the inventory page without logging in first(Broken Access Control Validation)', async () => {
    await browserInstance.openUrl('https://www.saucedemo.com/inventory.html')

    assert.isTrue(
      await loginPage.isErrorMessageDisplayed(),
      'Error message should be displayed when trying to access restricted area of the app without login',
    )
    assert.equal(
      await loginPage.getErrorMessageText(),
      "Epic sadface: You can only access '/inventory.html' when you are logged in.",
      'Correct error message should be displayed',
    )
    assert.equal(await browserInstance.getUrl(), 'https://www.saucedemo.com/', 'Should not redirect from page')
  })
  it('Should login and redirect to product page when valid credentials are entered', async () => {
    await loginPage.login('performance_glitch_user', 'secret_sauce')
    
    assert.equal(await browserInstance.getUrl(), 'https://www.saucedemo.com/inventory.html')
    assert.isTrue(await inventoryPage.isVisible(), "Inventory container should be visible on the page")
    assert.isTrue(await inventoryPage.isProductsElementDisplayed(), 'Text "Products" should be displayed on the page')
    assert.equal(await inventoryPage.getProductsElementText(), 'Products', 'Text "Products" should be displayed on the page')
  })
  it('Should display correct error message when username field is empty', async () => {
    await loginPage.enterPassword('test')
    await loginPage.submit()

    assert.isTrue(await loginPage.isErrorMessageDisplayed(), 'Error message should be displayed when form is submited without username')
    assert.equal(
      await loginPage.getErrorMessageText(),
      'Epic sadface: Username is required',
      'should display correct error message when username field is empty',
    )
  })
  it('Should display correct error message when password field is empty', async () => {
    await loginPage.enterUsername('test')
    await loginPage.submit()

    assert.isTrue(await loginPage.isErrorMessageDisplayed(), 'Error message should be displayed when form is submited without password')
    assert.equal(
      await loginPage.getErrorMessageText(),
      'Epic sadface: Password is required',
      'should display correct error message when password field is empty',
    )
  })
  it('Should display correct error message when invalid credentials are submited', async () => {
    await loginPage.login('test', 'test')

    assert.isTrue(await loginPage.isErrorMessageDisplayed(), 'Error message should be displayed when form is submited with invalid credentials')
    assert.equal(
      await loginPage.getErrorMessageText(),
      'Epic sadface: Username and password do not match any user in this service',
      'should display correct error message when incorrect credentials are submited',
    )
  })
})
