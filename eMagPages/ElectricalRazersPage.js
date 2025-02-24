const Button = require('../framework/Button.js')
const Label = require('../framework/Label.js')
const BaseForm = require('../framework/BaseForm.js')
const Dropdown = require('../framework/Dropdown.js')
const TextBox = require('../framework/TextBox.js')
const CheckBox = require('../framework/Checkbox.js')
const Timeouts = require('../framework/timeouts.js')

class ElectricalRazersPage extends BaseForm {
  constructor() {
    super('//div[@class="page-container"]', 'Electrical Razers Page Container')
    this.titles = []
    this.prices = []
    this.seeMoreButton = new Button('//a[@data-filter-id="6416" and contains(text(), "виж повече")]', 'See More Button')
    this.manifacturerSearchBox = new TextBox(
      '//input[@type="search" and @class="js-filter-search filter-search-input form-control input-sm" ]',
      'Manifacturer search box',
    )
    this.filterButton = new Button('//button[text()="Филтрирай"]', 'Filter Button')
    this.sortDropdown = new Dropdown('//div[@class="sort-control-item"]', 'Sorting Dropdown Menu')
    this.descOrderOption = new Label('//a[@data-sort-dir="desc" and @data-sort-id="price"]', 'Sort In Descending Order Option')
    this.nextPageButton = new Button('//span[text()="Напред"]', 'Navigation Button To Next Page')
    this.braunCheckBox = new CheckBox('//a[@data-name="Braun" and @data-position="popup"]', 'Braun CheckBox')
    this.allProducts = new Label('//p[@class="product-new-price"]', 'Product Elements')
  }

  async initializeTitlesAndPrices() {
    //We can discuss if this is ok i realize that private functions shouldn't be used like this
    const productsCount = (await this.allProducts._getElements()).length - 1
    this.titles = []
    this.prices = []

    for (let i = 1; i <= productsCount; i++) {
      this.prices.push(new Label(`(//p[@class="product-new-price"])[${i}]`, 'Product Price'))
      this.titles.push(new Label(`(//h2[@class="card-v2-title-wrapper"]/a)[${i}]`, 'Product Title'))
    }
  }

  async getAllProductTitles() {
    const titlesArray = []

    for (const title of this.titles) {
      titlesArray.push(await title.getText())
    }

    return titlesArray
  }

  async getAllProductPrices() {
    const pricesArray = []

    for (const price of this.prices) {
      const priceText = await price.getText()
      const numericValue = parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'))

      pricesArray.push(numericValue)
    }

    return pricesArray
  }

  async clickSeeMoreButton() {
    await this.seeMoreButton.click()
  }

  async sendTextToSearchBox(text) {
    await this.manifacturerSearchBox.sendText(text)
  }

  async checkBraunCheckBox() {
    await this.braunCheckBox.check()
  }

  async clickFilterButton() {
    this.filterButton.click()
    await browser.waitUntil(
      async () => {
        return (await browser.getUrl()).includes('braun')
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Couldnt load daikin air conditioners page' },
    )
  }

  async clickNextPageButton() {
    await this.nextPageButton.click()
    await browser.waitUntil(
      async () => {
        return (await browser.getUrl()) === 'https://www.emag.bg/elektricheski-samobrysnachki/brand/braun/p2/c'
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Couldnt load second product page' },
    )
  }

  async sortPriceInDescendingOrder() {
    await this.sortDropdown.click()
    await this.descOrderOption.click()
    await browser.waitUntil(
      async () => {
        return (await browser.getUrl()) === 'https://www.emag.bg/elektricheski-samobrysnachki/brand/braun/sort-pricedesc/c'
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Couldnt sort by descending' },
    )
  }
}

module.exports = ElectricalRazersPage
