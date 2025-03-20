const Button = require('../../framework/elementWrappers/Button.js')
const Label = require('../../framework//elementWrappers/Label.js')
const BaseForm = require('../../framework/BaseForm.js')
const Timeouts = require('../../framework/timeouts.js')

class FavoritesProductForm extends BaseForm {
  constructor(index) {
    const productLocator = `(//div[@class="card-v2 card-list card-list-updated"])[${index}]`

    super(productLocator, 'Favorites Product Locator')
    this.productPrice = new Label(`${productLocator}//p[@class="product-new-price"]`, 'Product Price')
    this.productTitle = new Label(`${productLocator}//a[@data-zone="title"]`, 'Product Title')
    this.deleteProductButton = new Button(`${productLocator}//span[text()="Изтрий"]`, 'Product Delete Button')
  }

  async getProductTitle() {
    return this.productTitle.getText()
  }

  async getProductPrice() {
    return this.productPrice.getText()
  }

  async isProductDisplayed() {
    return (await this.productTitle.isDisplayed()) && (await this.productPrice).isDisplayed()
  }

  async clickProductDeleteButton() {
    await this.deleteProductButton.click()
    await browser.waitUntil(
      async () => {
        return (await this.isProductDisplayed()) === false
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Couldnt delete the first product' },
    )
  }
}

module.exports = FavoritesProductForm
