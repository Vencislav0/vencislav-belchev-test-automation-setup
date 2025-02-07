const { assert } = require('chai')
const browser = require('../../../framework/Browser.js')
const logger = require('../../../framework/logger.js')
const LoginPage = require('../../../pages/LoginPage.js')

describe('Swag Labs Login e2e', () => {
  const loginPage = new LoginPage()

  it('Should display error message and icons and be removed when error message is closed', async () => {
    await browser.openUrl('https://www.saucedemo.com/')

    await logger.logStep('Submiting empty login form')
    await loginPage.submit()

    await logger.logStep('Verifying that all error messages are displayed')
    assert.isTrue(await loginPage.isErrorIconUsernameDisplayed(), 'Username error icon should be displayed')
    assert.isTrue(await loginPage.isErrorIconPasswordDisplayed(), 'Password error icon should be displayed')
    assert.isTrue(await loginPage.isErrorMessageDisplayed(), 'Error message should be displayed')

    await logger.logStep('Clicking error message exist button to close the errors')
    await loginPage.clickErrorMessageExitButton()

    await logger.logStep('Verifying that the error messages are gone')
    assert.isFalse(await loginPage.isErrorIconUsernameDisplayed(), 'Username error icon should not be be displayed after error message is closed')
    assert.isFalse(await loginPage.isErrorIconPasswordDisplayed(), 'Password error icon should not be displayed after error message is closed')
    assert.isFalse(await loginPage.isErrorMessageDisplayed(), 'Erroe message should not be displayed after error message is closed')
  })
})
