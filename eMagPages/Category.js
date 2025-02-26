const Button = require('../framework/Button.js')
const Label = require('../framework/Label.js')
const BaseForm = require('../framework/BaseForm.js')
const Dropdown = require('../framework/Dropdown.js')
const TextBox = require('../framework/TextBox.js')
const CheckBox = require('../framework/Checkbox.js')
const Timeouts = require('../framework/timeouts.js')

const Categories = {
    Phones: {
        category: 'Mobile Phones',
        checkboxTemplate: (manufacturer) => `//a[@data-name="${manufacturer}" and @data-position="popup"]`,
        descOrderUrlTemplate: (manufacturer) => `https://www.emag.bg/mobilni-telefoni/brand/${manufacturer.toLowerCase()}/sort-pricedesc/c`,
        secondPageUrlTemplate: (manufacturer) => `https://www.emag.bg/mobilni-telefoni/brand/${manufacturer.toLowerCase()}/p2/c`       
        
    },
    AirConditioners: {
        category: 'Air Conditioners',
        checkboxTemplate: (manufacturer) => `//a[@data-name="${manufacturer}" and @data-position="popup"]`,
        descOrderUrlTemplate: (manufacturer) => `https://www.emag.bg/klimatici/brand/${manufacturer.toLowerCase()}/sort-pricedesc/c`,
        secondPageUrlTemplate: (manufacturer) => `https://www.emag.bg/klimatici/brand/${manufacturer.toLowerCase()}/p2/c`       
        
    },

    ElectricalRazers:{
        category: 'Electrical Razers',
        checkboxTemplate: (manufacturer) => `//a[@data-name="${manufacturer}" and @data-position="popup"]`,
        descOrderUrlTemplate: (manufacturer) => `https://www.emag.bg/elektricheski-samobrysnachki/brand/${manufacturer.toLowerCase()}/sort-pricedesc/c`,
        secondPageUrlTemplate: (manufacturer) => `https://www.emag.bg/elektricheski-samobrysnachki/brand/${manufacturer.toLowerCase()}/p2/c`
    }

}

class Category extends BaseForm {
  constructor(category, manufacturer) {
    if(!Categories[category]){
        throw new Error('Invalid category or still not implemented')
    }
    const categoryData = Categories[category]
    super('//div[@class="page-container"]', `${categoryData.category} Page Container`)
    this.categoryData = categoryData
    this.manufacturer = manufacturer    
    this.seeMoreButton = new Button('//a[@data-filter-id="6416" and contains(text(), "виж повече")]', 'See More Button')
    this.manifacturerSearchBox = new TextBox(
      '//input[@type="search" and @class="js-filter-search filter-search-input form-control input-sm" ]',
      'Manifacturer search box',
    )
    this.filterButton = new Button('//button[text()="Филтрирай"]', 'Filter Button')
    this.sortDropdown = new Dropdown('//div[@class="sort-control-item"]', 'Sorting Dropdown Menu')
    this.descOrderOption = new Label('//a[@data-sort-dir="desc" and @data-sort-id="price"]', 'Sort In Descending Order Option')
    this.nextPageButton = new Button('//span[text()="Напред"]', 'Navigation Button To Next Page')
    this.checkBox = new CheckBox(categoryData.checkboxTemplate(this.manufacturer), 'Braun CheckBox')    
  }
    
  async clickSeeMoreButton() {
    await this.seeMoreButton.click()
  }

  async sendTextToSearchBox(text) {
    await this.manifacturerSearchBox.sendText(text)
  }

  async checkCheckBox() {
    await this.checkBox.check()
  }

  async clickFilterButton() {
    this.filterButton.click()
    await browser.waitUntil(
      async () => {
        return (await browser.getUrl()).includes(this.manufacturer.toLowerCase())
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: `Couldnt load ${this.categoryData.category} page` },
    )
  }

  async clickNextPageButton() {
    await this.nextPageButton.click()
    await browser.waitUntil(
      async () => {
        return (await browser.getUrl()) === this.categoryData.secondPageUrlTemplate(this.manufacturer)
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Couldnt load second product page' },
    )
  }

  async sortPriceInDescendingOrder() {
    await this.sortDropdown.click()
    await this.descOrderOption.click()
    await browser.waitUntil(
      async () => {
        return (await browser.getUrl()) === this.categoryData.descOrderUrlTemplate(this.manufacturer)
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Couldnt sort by descending' },
    )
  }
}

module.exports = Category