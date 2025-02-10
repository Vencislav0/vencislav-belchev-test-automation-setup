const { assert } = require('chai')
const browser = require('../../../framework/Browser.js')
const logger = require('../../../framework/logger.js')
const LoginPage = require('../../../pages/LoginPage.js')

describe('Swag Labs Login e2e', () => {
  const loginPage = new LoginPage()

  it('Should not provide access to the inventory page without logging in first(Broken Access Control Validation)', async () => {
    await logger.logStep('Opening inventory page without login')
    await browser.openUrl('https://www.saucedemo.com/inventory.html')

    await logger.logStep('Veryfing that an error message is displayed')
    assert.isTrue(await loginPage.isErrorMessageDisplayed(), 'Error message should be displayed when trying to access restricted area of the app without login')
    await logger.logStep('Verifying the text of the error message')
    assert.equal(
      await loginPage.getErrorMessageText(),
      "Epic sadface: You can only access '/inventory.html' when you are logged in.",
      'Correct error message should be displayed',
    )

    await logger.logStep('Verifying that the page is still the login from page')
    assert.equal(await browser.getUrl(), 'https://www.saucedemo.com/', 'Should not redirect from page')
  })
})
