import { BaseForm } from '../../../framework/elementWrappers/BaseForm'
import { Label } from '../../../framework/elementWrappers/Label'

export class CartPage extends BaseForm {
  constructor() {
    super('//div[@id="cart-products"]', 'Cart Product Container Locator')
    this.header = new Label('//h1', 'Cart Page header')
    this.emptyCartMessage = new Label('//p[@class="mb-0"]', 'Empty Cart Message')
  }

  async getHeaderText(page) {
    return this.header.getText(page)
  }

  async getEmptyCartMessage(page) {
    return this.emptyCartMessage.getText(page)
  }
}
