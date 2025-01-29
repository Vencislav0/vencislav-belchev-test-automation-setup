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
  it('Placeholder Text and Credentials Validation', async () => {
    assert.equal(await browser.getUrl(), 'https://www.saucedemo.com/', 'should be on the login page')

    const usernamesInnerHTML = await LoginPage.credentialsBlock.getProperty('innerHTML')
    const validUsernamesTextArray = usernamesInnerHTML
      .split(
        '<div class="login_credentials_wrap-inner"><div id="login_credentials" class="login_credentials" data-test="login-credentials"><h4>Accepted usernames are:</h4>',
      )
      .map((text) => text.split('<br>'))
      .flat()

    const passwordsInnerHTML = await $('//div[@data-test="login-password"]').getProperty('innerHTML')
    const validPasswordsTextArray = passwordsInnerHTML
      .split('<h4>Password for all users:</h4>')
      .map((text) => text.trim())
      .filter((text) => text.length > 0)

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

    const errorIcons = await $$('svg')

    const usernameErrorIcon = errorIcons[0]
    const passwordErrorIcon = errorIcons[1]
    const errorMessageExitButton = errorIcons[2]

    assert.isTrue(await LoginPage.errorMessage.isDisplayed(), 'Error message should be displayed when invalid credentials are entered')
    assert.isTrue(await usernameErrorIcon.isDisplayed(), 'Error icon on username should be displayed when invalid credentials are entered')    
    assert.isTrue(await passwordErrorIcon.isDisplayed(), 'Error icon on username should be displayed when invalid credentials are entered')

    await errorMessageExitButton.click()

    assert.isFalse(await LoginPage.errorMessage.isDisplayed(), 'Error message should disappear when error message is closed')
    assert.isFalse(await usernameErrorIcon.isDisplayed(), 'Error icon on username should disappear when error message is closed')
    //Turns out this part fails when classic webdriver config is enabled. I would assume that the behaviour for isDisplayed() 
    // method calls the locator again in the classic version which makes it fail since clicking the exit button on the error message removes them.
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
