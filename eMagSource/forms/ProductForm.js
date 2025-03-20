const Button = require('../../framework/elementWrappers/Button.js')
const Label = require('../../framework//elementWrappers/Label.js')
const BaseForm = require('../../framework/BaseForm.js')

class ProductForm extends BaseForm {
  constructor(index) {
    super(`(//div[@id="card_grid"]//div[@class="card-v2"])[${index}]`, 'Product Locator')
    this.productFormLocator = `(//div[@id="card_grid"]//div[@class="card-v2"])`
    this.index = index
    this.productPrice = new Label(`${this.productFormLocator}[${index}]//p[@class="product-new-price"]`, 'Product Price')
    this.productPriceOpenedProduct = new Label(`${this.productFormLocator}[${index}]//p[@class="pricing rrp"]`, 'Product Price On Opened Product')
    this.productTitle = new Label(`${this.productFormLocator}[${index}]//h2[@class="card-v2-title-wrapper"]/a`, 'Product Title')
    this.productAddFavouriteButton = new Button(`(//div[@class="card-v2-toolbox"]/button[@data-type="micro"])[${index}]`, 'Add Favourite Button')
  }

  async getFormsCount() {
    const productForm = new Label(this.productFormLocator, 'Locator For Forms Inside Categories')
    const count = await productForm._getElements()

    return count.length
  }

  async getProductTitle() {
    return this.productTitle.getText()
  }

  async getProductPrice() {
    return this.productPrice.getText()
  }

  async getOpenedProductPrice() {
    return this.productPriceOpenedProduct.getText()
  }

  async addProductToFavourites() {
    await this.productAddFavouriteButton.click()
  }

  async getProductFavouriteState() {
    return await this.productAddFavouriteButton.getAttribute('class')
  }

  async getProductHeartLabel() {
    return this.productAddFavouriteButton.getText()
  }
}

module.exports = ProductForm
