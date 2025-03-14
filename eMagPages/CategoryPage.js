const Button = require('../framework/Button.js')
const Label = require('../framework/Label.js')
const BaseForm = require('../framework/BaseForm.js')
const ProductForm = require('./ProductForm.js')

const Categories = {
  phones: {
    category: 'Mobile Phones',
    categoryID: '1',
    itemID: '3861',
  },

  airConditioners: {
    category: 'Air Conditioners',
    categoryID: '418',
    itemID: '3187',
  },

  electricalRazers: {
    category: 'Electrical Razers',
    categoryID: '549',
    itemID: '3906',
  },

  drones: {
    category: 'Drones',
  },

  gamingConsoles: {
    category: 'Gaming Consoles',
    categoryID: '3096',
    itemID: '3721',
  },
  vrHeadSets: {
    category: 'VR Head Sets',
    categoryID: '3096',
    itemID: '3805',
  },

  dummyCategory: {
    category: 'Dummy Category',
  },
}

class Category extends BaseForm {
  constructor(category) {
    if (!Categories[category]) {
      throw new Error('Invalid category or still not implemented')
    }
    const categoryData = Categories[category]
    super('//div[@class="page-container"]', `${categoryData.category} Page Container`)
    this.categoryData = categoryData
    this.sectionTitle = new Label('//h1', 'Section Title')
    this.navigationLabel = new Label(`//li[@data-id="${categoryData.categoryID}"]`, `${categoryData.category} Navigation Locator`)
    this.categoryNavigationButton = new Button(`//a[@data-id="${categoryData.itemID}"]`, `${categoryData.category} Navigation Button`)
    this.pageHeader = new Label('//div[@class="listing-page-title js-head-title"]//span', 'Page Header')
    this.nextPageButton = new Button('//span[text()="Напред"]', 'Navigation Button To Next Page')
    this.heartIconNumber = new Label('//span[@class="jewel jewel-danger"]', 'Number on the Heart Icon')
    this.heartIconLabel = new Label('//a[@id="my_wishlist"]', 'Heart Icon')
  }

  async clickProduct(index) {
    const product = new ProductForm(index)

    await product.formElement.click()
  }

  async clickHeartMenuItem() {
    await this.heartIconLabel.click()
  }

  async getNumberOnHeartIcon() {
    return parseInt(await this.heartIconNumber.getText())
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
    await this.navigationLabel.moveToElement()
  }

  async clickOnCategoryNavigationButton() {
    await this.categoryNavigationButton.click()
  }
}

module.exports = Category
