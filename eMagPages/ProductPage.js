const Button = require('../framework/Button.js')
const Label = require('../framework/Label.js')
const BaseForm = require('../framework/BaseForm.js')
const Timeouts = require('../framework/timeouts.js')

class ProductPage extends BaseForm {
  constructor() {
    super('//div[@class="main-container"]', 'Product Main Container')
    this.productPrice = new Label('//p[@data-test="main-price"]', 'Product Price')
    this.productTitle = new Label('//h1[@data-test="page-title"]', 'Product Title')
    this.addToCartButton = new Button('//button[@data-test="main-add-to-cart-button"]', 'Add To Cart Button')
    this.modalFormTitle = new Label('//span[@class="d-none d-sm-block"]', 'Modal Form Title')
    this.seeCartButton = new Button('//a[@class="btn btn-primary btn-sm btn-block"]', '"See Cart" Button')
  }

  async getProductTitle() {
    return this.productTitle.getText()
  }

  async getProductPrice() {
    const priceText = await this.productPrice.getText()
    const numericValue = parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'))

    return numericValue
  }

  async clickAddToCartButton() {
    await this.addToCartButton.click()
    await browser.waitUntil(
      async () => {
        return await this.modalFormTitle.isDisplayed()
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Couldnt open modal form' },
    )
  }
}

module.exports = ProductPage
