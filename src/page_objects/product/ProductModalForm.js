import { BaseForm } from '../../../framework/elementWrappers/BaseForm'
import { Button } from '../../../framework/elementWrappers/Button'
import { Label } from '../../../framework/elementWrappers/Label'

export class ProductModalForm extends BaseForm {
  constructor() {
    super('//div[@class="modal-dialog modal-lg"]/div[@class="modal-content"]', 'Modal Form Container Locator')
    this.goToCartButton = new Button('//div[contains(@class, "table")]//a[@data-test="atc-modal-cart-details"]', 'Go To Cart Button')
    this.productTitle = new Label('//span[@class="small"]', 'Modal Product Title')
    this.productPrice = new Label('(//div[contains(@class, "table")]//p[@class="product-new-price"])[3]', 'Modal Product Price')
  }

  async clickGoToCartButton(page) {
    await this.goToCartButton.click(page)
  }

  async getTitle(page) {
    return this.productTitle.getText(page)
  }

  async getPrice(page) {
    return this.productPrice.getText(page)
  }
}
