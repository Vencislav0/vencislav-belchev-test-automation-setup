const Button = require('../../../framework/elementWrappers/Button.js')
const Label = require('../../../framework//elementWrappers/Label.js')
const BaseForm = require('../../../framework/BaseForm.js')

class ProductForm extends BaseForm {
  constructor(index) {
    super(`(//div[@id="card_grid"]//div[@class="card-v2"])[${index}]`, 'Product Locator')
    this.productFormLocator = `(//div[@id="card_grid"]//div[@class="card-v2"])[${index}]`
    this.productPrice = new Label(`${this.productFormLocator}//p[@class="product-new-price"]`, 'Product Price')
    this.productPriceOpenedProduct = new Label(`${this.productFormLocator}//p[@class="pricing rrp"]`, 'Product Price On Opened Product')
    this.productTitle = new Label(`${this.productFormLocator}//h2[@class="card-v2-title-wrapper"]/a`, 'Product Title')
    this.productAddFavouriteButton = new Button(`${this.productFormLocator}//button[@data-type="micro"]`, 'Add Favourite Button')
  }

  async getProductTitle() {
    return this.productTitle.getText()
  }

  async getProductPrice() {
    return this.productPrice.getText()
  }

  async clickProduct() {
    await this.formElement.click()
  }

  async getOpenedProductPrice() {
    return this.productPriceOpenedProduct.getText()
  }

  async addProductToFavourites() {
    await this.productAddFavouriteButton.click()
  }

  async getProductFavouriteState() {
    return this.productAddFavouriteButton.getAttribute('class')
  }
}

module.exports = ProductForm
