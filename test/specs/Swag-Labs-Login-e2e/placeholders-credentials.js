const { assert } = require('chai')
const browser = require('../../../framework/Browser.js')
const logger = require('../../../framework/logger.js')
const LoginPage = require('../../../pages/LoginPage.js')

describe('Swag Labs Login e2e', () => {
  const loginPage = new LoginPage()

  it('Placeholder Text and Credentials Validation', async () => {
    await browser.openUrl('https://www.saucedemo.com/')

    await logger.logStep('Verifying url is correct')
    assert.equal(await browser.getUrl(), 'https://www.saucedemo.com/', 'should be on the login page')

    await logger.logStep('Getting usernames from credentials block')
    const credentialsBlockText = await loginPage.getUsernameBlockText()
    const validUsernamesTextArray = await credentialsBlockText.split('\n').filter((text) => !text.includes('Accepted usernames are:'))

    await logger.logStep('Getting passwords from credentials block')
    const passwordsText = await loginPage.getPasswordBlockText()
    const validPasswordsTextArray = passwordsText.split('\n').filter((text) => !text.includes('Password for all users:'))

    await logger.logStep('Getting placeholders for username and password fields')
    const usernamePlaceholder = await loginPage.getUsernamePlaceholder()
    const passwordPlaceholder = await loginPage.getPasswordPlaceholder()

    await logger.logStep('Getting login button text and color')
    const loginButtonText = await loginPage.getLoginButtonValue()
    const loginButtonColor = await loginPage.getLoginButtonColor()

    await logger.logStep('Placeholders and login button validation')
    assert.equal(usernamePlaceholder, 'Username', 'Placeholder should be Username')
    assert.equal(passwordPlaceholder, 'Password', 'Placeholder should be Password')
    assert.equal(loginButtonText, 'Login', 'Login Button text should be Login')
    assert.equal(loginButtonColor.parsed['hex'], '#3ddc91', 'Login button wasnt green')

    await logger.logStep('Credentials block validation')
    assert.deepInclude(validUsernamesTextArray, 'standard_user', 'standard_user should be a part of the username pool')
    assert.deepInclude(validUsernamesTextArray, 'locked_out_user', 'locked_out_user should be a part of the username pool')
    assert.deepInclude(validUsernamesTextArray, 'problem_user', 'problem_user should be a part of the username pool')
    assert.deepInclude(validUsernamesTextArray, 'performance_glitch_user', 'performance_glitch_user should be a part of the username pool')
    assert.deepInclude(validUsernamesTextArray, 'visual_user', 'visual_user should be a part of the username pool')
    assert.deepInclude(validPasswordsTextArray, 'secret_sauce', 'secret_sauce should be a part of the password pool')
    assert.lengthOf(validPasswordsTextArray, 1, 'Password pool should contain only "secret_sauce" password for all accounts')
  })
})
