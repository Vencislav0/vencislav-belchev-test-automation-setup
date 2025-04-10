const Button = require('../../framework/elementWrappers/Button.js')
const Label = require('../../framework//elementWrappers/Label.js')
const BaseForm = require('../../framework/BaseForm.js')

class CategoryPage extends BaseForm {
  constructor(category) {
    if (!category) {
      throw new Error('category not found, or still not implemented')
    }
    super('//div[@class="page-container"]', `${category.categoryName} Page Container Locator`)
    this.sectionTitle = new Label('//h1', 'Section Title')
    this.categoryLabel = new Label(`//li[@data-id="${category.categoryID}"]`, `${category.categoryName} Navigation Locator`)
    this.itemButton = new Button(`//a[@data-id="${category.itemID}"]`, `${category.categoryName} Navigation Button`)
    this.pageHeader = new Label('//div[@class="listing-page-title js-head-title"]//span', 'Page Header')
    this.nextPageButton = new Button('//span[text()="Напред"]', 'Navigation Button To Next Page')
  }

  async getFormsCount() {
    const productForm = new Label('//div[@id="card_grid"]//div[@class="card-v2"]', 'Locator For Forms Inside Categories')
    const productsArray = await productForm._getElements()

    return productsArray.length
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

module.exports = CategoryPage
