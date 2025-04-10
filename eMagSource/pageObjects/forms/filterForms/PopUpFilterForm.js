const CheckBox = require('../../../../framework/elementWrappers/Checkbox.js')
const Button = require('../../../../framework/elementWrappers/Button.js')
const TextBox = require('../../../../framework/elementWrappers/TextBox.js')
const BaseForm = require('../../../../framework/BaseForm.js')

class PopUpFilterForm extends BaseForm {
  constructor(filter) {
    if (!filter) {
      throw new Error('category not found, or still not implemented')
    }
    const filterLocator = `//div[@data-filter-id="${filter.filterID}"]`
    super(filterLocator, 'Manufacturer Filter Locator')
    this.filterButton = new Button(`${filterLocator}//button[text()="Филтрирай"]`, 'Filter Button')
    this.searchBox = new TextBox(`${filterLocator}//div[@class="form-inline"]//input`, 'Search Box')
  }

  async sendTextToSearchBox(text) {
    await this.searchBox.sendText(text)
  }

  async clickFilterButton() {
    await this.filterButton.click()
  }

  async checkCheckBox(name) {
    const checkBox = new CheckBox(`//a[@data-name="${name}" and @data-position="popup"]`, `${name} CheckBox`)
    await checkBox.check()
  }
}

module.exports = PopUpFilterForm
