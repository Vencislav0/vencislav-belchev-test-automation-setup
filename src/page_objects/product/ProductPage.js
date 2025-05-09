import { BaseForm } from '../../../framework/elementWrappers/BaseForm'
import { Button } from '../../../framework/elementWrappers/Button'
import { Label } from '../../../framework/elementWrappers/Label'

export class ProductPage extends BaseForm {
  constructor() {
    super('//div[@class="row product-main-area mb-2"]', 'Product Container Locator')
    this.productPrice = new Label('//p[@data-test="main-price"]', 'Page Product Price')
    this.productTitle = new Label('//h1[@data-test="page-title"]', 'Page Product Title')
    this.addToCartButton = new Button('//button[@data-test="main-add-to-cart-button"]', 'Add To Cart Button')
  }

  async getPrice(page) {
    return this.productPrice.getText(page)
  }

  async getTitle(page) {
    return this.productTitle.getText(page)
  }

  async clickAddToCartButton(page) {
    await this.addToCartButton.click(page)
  }
}
