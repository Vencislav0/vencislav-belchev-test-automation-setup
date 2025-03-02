const Button = require('../framework/Button.js')
const Label = require('../framework/Label.js')
const BaseForm = require('../framework/BaseForm.js')
const Timeouts = require('../framework/timeouts.js')

class CartProductForm extends BaseForm {
  constructor(index) {
    const productLocator = `(//div[@class="cart-widget cart-line "])[${index}]`
    const productActionsContainerLocator = `(//div[contains(@class, "d-md-block")])[${index}]`

    super(productLocator, 'Cart Product Locator')

    this.deleteProductButton = new Button(`${productActionsContainerLocator}//button[normalize-space(text())="Изтрий"]`, 'Product Delete Button')
    this.increaseQntyButton = new Button(`${productActionsContainerLocator}//button[@data-test="increaseQtyBtn"]`, 'Increase Quantity Button')
    this.productPrice = new Label(`${productActionsContainerLocator}//p[@class="product-new-price"]`, 'Product Price')
    this.productTitle = new Label(`${productLocator}//a[@class="line-item-title main-product-title"]`, 'Product Title')
    this.quantityLabel = new Label(`${productActionsContainerLocator}//span[@data-test="qtyValue"]`, 'Quantity Label')
  }

  async getProductTitle() {
    return this.productTitle.getText()
  }

  async getProductPrice() {
    return this.productPrice.getText()
  }

  async isProductTitleDisplayed() {
    return this.productTitle.isDisplayed()
  }

  async clickDeleteProductButton() {
    await this.deleteProductButton.click()
    await browser.waitUntil(
      async () => {
        return (await this.deleteProductButton.isDisplayed()) === false
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Empty cart message wasnt visible after deleting product' },
    )
  }

  async getQntyButton() {
    return this.increaseQntyButton
  }

  async getQuantity() {
    return parseInt(await this.quantityLabel.getText())
  }

  async clickOnIncreaseQntyButton() {
    const initialPrice = await this.getProductPrice()
    await (await this.getQntyButton()).click()
    await browser.waitUntil(
      async () => {
        return (await this.getProductPrice()) !== initialPrice
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Failed to click on + button' },
    )
  }
}

module.exports = CartProductForm
