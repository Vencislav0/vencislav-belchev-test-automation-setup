const BaseForm = require('../../../../framework/BaseForm.js')
const CheckBox = require('../../../../framework/elementWrappers/Checkbox.js')
const Label = require('../../../../framework/elementWrappers/Label.js')

class FilterForm extends BaseForm {
  constructor(filter) {
    if (!filter) {
      throw new Error('category not found, or still not implemented')
    }
    const filterLocator = `//div[@data-filter-id="${filter.filterID}"]`
    super(filterLocator, 'Filter Locator')
    this.seeMoreButton = new Label(`${filterLocator}//div[@class="filter-body-separator"]/a`, 'See More Button')
  }

  async clickSeeMoreButton() {
    await this.seeMoreButton.click()
  }

  async checkCheckBox(name) {
    const checkBox = new CheckBox(`//a[@data-name="${name}"]`, `${name} CheckBox`)
    await checkBox.check()
  }
}

module.exports = FilterForm
