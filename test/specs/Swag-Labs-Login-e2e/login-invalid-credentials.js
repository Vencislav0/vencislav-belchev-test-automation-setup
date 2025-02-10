const { assert } = require('chai')
const browser = require('../../../framework/Browser.js')
const logger = require('../../../framework/logger.js')
const LoginPage = require('../../../pages/LoginPage.js')

describe('Swag Labs Login e2e', () => {
  const loginPage = new LoginPage()

  it('Should display correct error message when invalid credentials are submited', async () => {
    await browser.openUrl('https://www.saucedemo.com/')

    await logger.logStep('Attempt Login with invalid credentials')
    await loginPage.login('test', 'test')

    await logger.logStep('Verifying that error is displayed')
    assert.isTrue(await loginPage.isErrorMessageDisplayed(), 'Error message should be displayed when form is submited with invalid credentials')

    await logger.logStep('Verifying error message text')
    assert.equal(
      await loginPage.getErrorMessageText(),
      'Epic sadface: Username and password do not match any user in this service',
      'should display correct error message when incorrect credentials are submited',
    )
  })
})
