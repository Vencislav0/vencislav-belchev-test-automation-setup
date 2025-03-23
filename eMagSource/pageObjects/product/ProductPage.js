const Button = require('../../../framework/elementWrappers/Button.js')
const Label = require('../../../framework/elementWrappers/Label.js')
const BaseForm = require('../../../framework/BaseForm.js')
const Timeouts = require('../../../framework/timeouts.js')
const ProductModalForm = require('../cart/ProductModalForm.js')

const productModalForm = new ProductModalForm()

class ProductPage extends BaseForm {
  constructor() {
    super('//section[@class="page-section page-section-light"]', 'Product Container Locator')
    this.productPrice = new Label('//p[@data-test="main-price"]', 'Product Price')
    this.productTitle = new Label('//h1[@data-test="page-title"]', 'Product Title')
    this.addToCartButton = new Button('//button[@data-test="main-add-to-cart-button"]', 'Add To Cart Button')
    this.seeCartButton = new Button('//a[@data-test="atc-modal-cart-details"]', '"See Cart" Button')
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
