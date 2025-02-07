const { assert } = require('chai')
const browser = require('../../../framework/Browser.js')
const logger = require('../../../framework/logger.js')
const LoginPage = require('../../../pages/LoginPage.js')
const InventoryPage = require('../../../pages/InventoryPage.js')

describe('Swag Labs Login e2e', () => {
  const loginPage = new LoginPage()
  const inventoryPage = new InventoryPage()

  it('Should login and redirect to product page when valid credentials are entered', async () => {
    await browser.openUrl('https://www.saucedemo.com')

    await logger.logStep('Logging with valid credentials')
    await loginPage.login('performance_glitch_user', 'secret_sauce')

    await logger.logStep('Verifying redirection to inventory page')
    assert.equal(await browser.getUrl(), 'https://www.saucedemo.com/inventory.html')

    await logger.logStep('Verifying that the Inventory container is displayed')
    assert.isTrue(await inventoryPage.isVisible(), 'Inventory container should be visible on the page')

    await logger.logStep('Verifying that Products element is displayed')
    assert.isTrue(await inventoryPage.isProductsElementDisplayed(), 'Text "Products" should be displayed on the page')

    await logger.logStep('Verifying text inside Products element')
    assert.equal(await inventoryPage.getProductsElementText(), 'Products', 'Text "Products" should be displayed on the page')
  })
})
