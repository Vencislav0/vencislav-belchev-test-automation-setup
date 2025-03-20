const Button = require('../../framework/elementWrappers/Button.js')
const Label = require('../../framework//elementWrappers/Label.js')
const BaseForm = require('../../framework/BaseForm.js')
const ProductForm = require('../forms/ProductForm.js')

class Category extends BaseForm {
  constructor(category) {
    if (!category) {
      throw new Error('Invalid category or still not implemented')
    }
    super('//div[@class="page-container"]', `${category.categoryName} Page Container`)
    this.sectionTitle = new Label('//h1', 'Section Title')
    this.categoryLabel = new Label(`//li[@data-id="${category.categoryID}"]`, `${category.categoryName} Navigation Locator`)
    this.itemButton = new Button(`//a[@data-id="${category.itemID}"]`, `${category.categoryName} Navigation Button`)
    this.pageHeader = new Label('//div[@class="listing-page-title js-head-title"]//span', 'Page Header')
    this.nextPageButton = new Button('//span[text()="Напред"]', 'Navigation Button To Next Page')
  }

  async clickProduct(index) {
    const product = new ProductForm(index)

    await product.formElement.click()
  }

  async clickNextPageButton() {
    await this.nextPageButton.click()
  }

  async getPageHeaderText() {
    return this.pageHeader.getText()
  }

  async getSectionTitleText() {
    return this.sectionTitle.getText()
  }

  async hoverOnCategoryLabel() {
    await this.categoryLabel.moveToElement()
  }

  async clickOnItemButton() {
    await this.itemButton.click()
  }
}

module.exports = Category
