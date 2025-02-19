const BaseForm = require('../framework/BaseForm.js')
const Label = require('../framework/Label.js')

class InventoryPage extends BaseForm {
  constructor() {
    super('//div[@data-test="inventory-container"]', 'Inventory Container')
    this.productsElement = new Label('//span[@data-test="title"]', 'Products Element')
  }

  async isProductsElementDisplayed() {
    return this.productsElement.isDisplayed()
  }

  async getProductsElementText() {
    return this.productsElement.getText()
  }
}

module.exports = InventoryPage
