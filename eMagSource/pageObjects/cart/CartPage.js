const Label = require('../../../framework/elementWrappers/Label.js')
const BaseForm = require('../../../framework/BaseForm.js')

class CartPage extends BaseForm {
  constructor() {
    super('//div[@id="cart-products"]', 'Cart Products Container Locator')
    this.cartPageHeader = new Label('//h1', 'Cart Page Header')
    this.emptyCartMessage = new Label('//p[@class="mb-0"]', 'Empty Cart Message')
  }

  async getCartPageHeaderText() {
    return this.cartPageHeader.getText()
  }

  async isEmptyCartMessageDisplayed() {
    return this.emptyCartMessage.isDisplayed()
  }

  async getEmptyCartMessageText() {
    return this.emptyCartMessage.getText()
  }
}

module.exports = CartPage
