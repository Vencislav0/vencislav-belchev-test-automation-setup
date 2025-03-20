const Button = require('../../framework/elementWrappers/Button.js')
const Label = require('../../framework//elementWrappers/Label.js')
const BaseForm = require('../../framework/BaseForm.js')
const Timeouts = require('../../framework/timeouts.js')
const ProductModalForm = require('../forms/ProductModalForm.js')

const productModalForm = new ProductModalForm()

class ProductPage extends BaseForm {
  constructor() {
    super('//div[@class="main-container"]', 'Product Main Container')
    this.productPrice = new Label('//p[@data-test="main-price"]', 'Product Price')
    this.productTitle = new Label('//h1[@data-test="page-title"]', 'Product Title')
    this.addToCartButton = new Button('//button[@data-test="main-add-to-cart-button"]', 'Add To Cart Button')
    this.seeCartButton = new Button('//a[@class="btn btn-primary btn-sm btn-block"]', '"See Cart" Button')
  }

  async getProductTitle() {
    return this.productTitle.getText()
  }

  async getProductPrice() {
    return this.productPrice.getText()
  }

  async clickAddToCartButton() {
    await this.addToCartButton.click()
    await browser.waitUntil(
      async () => {
        return await productModalForm.modalFormTitle.isDisplayed()
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Couldnt open modal form' },
    )
  }
}

module.exports = ProductPage
