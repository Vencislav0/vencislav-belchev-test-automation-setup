const { assert } = require('chai')
const browser = require('../../../framework/Browser.js')
const logger = require('../../../framework/logger.js')
const LoginPage = require('../../../pages/LoginPage.js')

describe('Swag Labs Login e2e', () => {
  const loginPage = new LoginPage()

  it('Should display correct error message when password field is empty', async () => {
    await browser.openUrl('https://www.saucedemo.com/')

    await logger.logStep('Submiting form with empty password field')
    await loginPage.enterUsername('test')
    await loginPage.submit()

    await logger.logStep('Verifying that an error message is displayed')
    assert.isTrue(await loginPage.isErrorMessageDisplayed(), 'Error message should be displayed when form is submited without password')

    await logger.logStep('Verifying error message text')
    assert.equal(
      await loginPage.getErrorMessageText(),
      'Epic sadface: Password is required',
      'should display correct error message when password field is empty',
    )
  })
})
