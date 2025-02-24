const Button = require('../framework/Button.js')
const Label = require('../framework/Label.js')
const BaseForm = require('../framework/BaseForm.js')
const Timeouts = require('../framework/timeouts.js')
const logger = require('../framework/logger.js')

class CartPage extends BaseForm {
  constructor() {
    super('//div[@class="main-container"]', 'Product Main Container')
    this.cartPageHeader = new Label('//h1[@class="page-title d-flex gap-2 align-items-center justify-content-between"]', 'Cart Page Header')
    this.increaseQntyButton = new Button(
      '//div[@class="line-item line-item-footer d-none d-md-block"]//button[@data-test="increaseQtyBtn"]',
      'Increase Quantity Button',
    )
    this.productPrice = new Label('//div[@class="line-item line-item-footer d-none d-md-block"]//p[@class="product-new-price"]', 'Product Price')
    this.pageTitle = new Label('//h1[@class="page-title d-flex gap-2 align-items-center justify-content-between"]', 'Cart Page Title')
    this.productTitle = new Label('//a[@class="line-item-title main-product-title"]', 'Product Title')
    this.quantityLabel = new Label(
      '//div[@class="line-item line-item-footer d-none d-md-block"]//span[@class="qty-value p-0 mx-2 fs-20 fw-semibold"]',
      'Quantity Label',
    )
    this.deleteProductButton = new Button(
      '//div[@class="line-item line-item-footer d-none d-md-block"]//button[@class="btn btn-link outline-0 fs-12 fs-md-14 btn-remove-product gtm_rp080219 remove-product"]',
      'Delete Product Button',
    )
    this.emptyCartMessage = new Label('//p[@class="mb-0"]', 'Empty Cart Message')
  }

  async getCartPageHeaderText() {
    return this.cartPageHeader.getText()
  }

  async getProductTitle() {
    return this.productTitle.getText()
  }

  async isEmptyCartMessageDisplayed() {
    return this.emptyCartMessage.isDisplayed()
  }

  async getEmptyCartMessageText() {
    return this.emptyCartMessage.getText()
  }

  async clickDeleteProductButton() {
    await this.deleteProductButton.click()
    try {
      await browser.waitUntil(
        async () => {
          return await this.isEmptyCartMessageDisplayed()
        },
        { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Empty cart message wasnt visible after deleting product' },
      )
    } catch (e) {
      logger.info('Empty cart wasnt displayed after deleting product, likely because more than one product is in the cart')
    }
  }

  async isProductTitleDisplayed() {
    return this.productTitle.isDisplayed()
  }

  async getProductPrice() {
    const priceText = await this.productPrice.getText()
    const numericValue = parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'))

    return numericValue
  }

  async clickOnIncreaseQntyButton() {
    const initialPrice = await this.getProductPrice()
    await this.increaseQntyButton.click()
    await browser.waitUntil(
      async () => {
        return (await this.getProductPrice()) !== initialPrice
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Failed to click on + button' },
    )
  }

  async getQuantityOfProduct() {
    return parseInt(await this.quantityLabel.getText())
  }
}

module.exports = CartPage
