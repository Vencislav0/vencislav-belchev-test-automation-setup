const Button = require('../../../framework/elementWrappers/Button.js')
const BaseForm = require('../../../framework/BaseForm.js')
const CheckBox = require('../../../framework/elementWrappers/Checkbox.js')

class BaseFilterForm extends BaseForm {
  constructor() {
    super(`//div[@class="filter filter-default js-filter"]`, 'Filter Locator')
    this.filterButton = new Button('//button[text()="Филтрирай"]', 'Filter Button')
    this.checkBox = ''
  }

  async clickFilterButton() {
    this.filterButton.click()
  }

  async checkCheckBox(name) {
    this.checkBox = new CheckBox(`//a[@data-name="${name}" and @data-position="popup"]`, `${name} CheckBox`)
    await this.checkBox.check()
  }
}

module.exports = BaseFilterForm
