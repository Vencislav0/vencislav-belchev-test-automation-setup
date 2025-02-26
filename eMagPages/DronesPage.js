const Button = require('../framework/Button.js')
const Label = require('../framework/Label.js')
const BaseForm = require('../framework/BaseForm.js')
const Dropdown = require('../framework/Dropdown.js')
const Timeouts = require('../framework/timeouts.js')

class DronesPage extends BaseForm {
  constructor() {
    super('//div[@class="page-container"]', 'Drones Page Container')
    this.pageHeader = new Label('//div[@class="listing-page-title js-head-title"]//span[@class="title-phrasing title-phrasing-sm"]', 'Page Header')
    this.popularitySortOption = new Label('//a[@data-sort-id="xg_popularity"]', 'Sort By Popularity')
    this.sortDropdown = new Dropdown('//div[@class="sort-control-item"]', 'Sorting Dropdown Menu')
    this.firstProductTitle = new Label('(//h2[@class="card-v2-title-wrapper"]/a)[1]', 'Title of the first product')
    this.secondProductTitle = new Label('(//h2[@class="card-v2-title-wrapper"]/a)[2]', 'Title of the second product')
    this.firstProductPrice = new Label('(//p[@class="product-new-price"])[1]', 'Price of the first product')
    this.secondProductPrice = new Label('(//p[@class="product-new-price"])[2]', 'Price of the second product')
    this.firstProductAddFavouriteButton = new Button(
      '(//div[@class="card-v2-toolbox"]/button[@data-type="micro"])[1]',
      'Add Favourite Button For First Product',
    )
    this.heartIconNumber = new Label('//span[@class="jewel jewel-danger"]', 'Number on the Heart Icon')
    this.heartIconLabel = new Label('//a[@id="my_wishlist"]', 'Heart Icon')
    this.secondProductAddFavouriteButton = new Button(
      '(//div[@class="card-v2-toolbox"]/button[@data-type="micro"])[2]',
      'Add Favourite Button For Second Product',
    )
  }

  async isHeaderStructureCorrect() {
    const header = await this.getPageHeaderText()
    const pattern = /^\d+\s+резултата\s+.+\s+за\s+"[^"]+"$/

    return pattern.test(header)
  }

  async clickHeartMenuItem() {
    await this.heartIconLabel.click()
  }

  async getNumberOnHeartIcon() {
    return parseInt(await this.heartIconNumber.getText())
  }

  async addFirstProductToFavourites() {
    await this.firstProductAddFavouriteButton.click()    
  }

  async addSecondProductToFavourites() {
    await this.secondProductAddFavouriteButton.click()
    await browser.waitUntil(async () => {
    return (await this.getNumberOnHeartIcon()) + 1
    }, {timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Heart menu didnt increment by 1'})
  }

  async getFirstProductFavouriteState() {
    return this.firstProductAddFavouriteButton.getAttribute('class')
  }

  async getSecondProductFavouriteState() {
    return this.secondProductAddFavouriteButton.getAttribute('class')
  }

  async getPageHeaderText() {
    return this.pageHeader.getText()
  }

  async sortItemsByPopularity() {
    await this.sortDropdown.click()
    await this.popularitySortOption.click()
    await browser.waitUntil(
      async () => {
        return (await browser.getUrl()) === 'https://www.emag.bg/search/dji+mini+4+pro/sort-xg_popularitydesc'
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Couldnt sort by popularity' },
    )
  }

  async getFirstProductTitle() {
    return this.firstProductTitle.getText()
  }

  async getSecondProductTitle() {
    return this.secondProductTitle.getText()
  }

  async getFirstProductPrice() {
    const priceText = await this.firstProductPrice.getText()
    const numericValue = parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'))

    return numericValue
  }

  async getSecondProductPrice() {
    const priceText = await this.secondProductPrice.getText()
    const numericValue = parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'))

    return numericValue
  }
}

module.exports = DronesPage
