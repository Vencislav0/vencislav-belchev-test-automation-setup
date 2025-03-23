const Label = require('../../../framework/elementWrappers/Label.js')
const BaseForm = require('../../../framework/BaseForm.js')
const Dropdown = require('../../../framework/elementWrappers/Dropdown.js')
const Timeouts = require('../../../framework/timeouts.js')

class SortForm extends BaseForm {
  constructor() {
    super('//div[contains(@class, "sort-control-btn-dropdown ")]', 'Sort Dropdown Locator')
    this.sortDropdown = new Dropdown('//div[@class="sort-control-item"]', 'Sorting Dropdown Menu')
    this.sortMenuPlaceholder = new Label('//div[@class="sort-control-item"]//span[@class="sort-control-btn-option text-truncate"]', 'Sorting Menu Placeholder')
    this.descOrderOption = new Label('//a[@data-sort-dir="desc" and @data-sort-id="price"]', 'Sort In Descending Order Option')
    this.popularitySortOption = new Label('//a[@data-sort-id="xg_popularity"]', 'Sort By Popularity')
    this.ascendingOrderOption = new Label('//a[@data-sort-dir="asc" and @data-sort-id="price"]', 'Sort In Ascending Order Option')
  }

  async getSortMenuText() {
    return this.sortMenuPlaceholder.getText()
  }

  async sortPriceInDescendingOrder() {
    await this.sortDropdown.click()
    await this.descOrderOption.click()
    await browser.waitUntil(
      async () => {
        return (await this.getSortMenuText()).includes('Цена низх.')
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Couldnt load second product page' },
    )
  }

  async sortItemsByPopularity() {
    await this.sortDropdown.click()
    await this.popularitySortOption.click()
    await browser.waitUntil(
      async () => {
        return (await this.getSortMenuText()).includes('Най-популярни')
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Couldnt load second product page' },
    )
  }

  async sortPriceInAscendingOrder() {
    await this.sortDropdown.click()
    await this.ascendingOrderOption.click()
    await browser.waitUntil(
      async () => {
        return (await this.getSortMenuText()).includes('Цена възх.')
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Couldnt load second product page' },
    )
  }
}

module.exports = SortForm
