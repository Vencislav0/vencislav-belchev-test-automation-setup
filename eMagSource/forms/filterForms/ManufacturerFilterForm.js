const Label = require('../../../framework//elementWrappers/Label.js')
const FilterForm = require('./BaseFilterForm.js')
const TextBox = require('../../../framework/elementWrappers/TextBox.js')

class ManufacturerFilterForm extends FilterForm {
  constructor() {
    super('//div[@class="filter filter-default js-filter" and @data-name="Производител"]', 'Manufacturer Filter Locator')
    this.seeMoreButton = new Label('//div[@data-filter-id="6416"]//div[@class="filter-body-separator"]/a', 'See More Button')
    this.searchBox = new TextBox('//div[@class="form-inline"]//input', 'Search Box')
  }

  async clickSeeMoreButton() {
    await this.seeMoreButton.click()
  }

  async sendTextToSearchBox(text) {
    await this.searchBox.sendText(text)
  }
}

module.exports = ManufacturerFilterForm
