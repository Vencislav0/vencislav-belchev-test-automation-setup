import { BaseForm } from '../../../framework/elementWrappers/BaseForm'
import { Button } from '../../../framework/elementWrappers/Button'
import { Label } from '../../../framework/elementWrappers/Label'
import { expect } from '@playwright/test'

export class CartProductForm extends BaseForm {
  constructor(index = 1) {
    const formLocator = `(//div[@class="cart-widget cart-line "])[${index}]`
    super('', 'Product Form Locator')
    this.QntyIncreaseButton = new Button(`${formLocator}//div[contains(@class, "d-md-block")]//button[@data-test="increaseQtyBtn"]`, 'Increase Qnty Button')
    this.removeProductButton = new Button(
      `${formLocator}//div[contains(@class, "d-md-block")]//button[contains(@class, "remove-product")]`,
      'Delete Product Button',
    )
    this.productPrice = new Label(`${formLocator}//div[contains(@class, "d-md-block")]//p[@class="product-new-price"]`, 'Cart Product Price')
    this.productTitle = new Label(`${formLocator}//a[@class="line-item-title main-product-title"]`, 'Cart Product Title')
  }

  async clickIncreaseQntyButton(page) {
    await this.QntyIncreaseButton.click(page)
  }

  async clickRemoveProductButton(page) {
    await this.removeProductButton.click(page)

    await this.formElement.waitForState(page, 'hidden')
  }

  async getPrice(page) {
    return this.productPrice.getText(page)
  }

  async getTitle(page) {
    return this.productTitle.getText(page)
  }

  async getIncreaseQntyButtonState(page) {
    return this.QntyIncreaseButton.getAttribute(page, 'class')
  }
}
