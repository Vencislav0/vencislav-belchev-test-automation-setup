const BaseForm = require('../../../../framework/BaseForm.js')
const Button = require('../../../../framework/Button.js')

class FilterForm extends BaseForm {
  constructor(filter) {
    if (!filter) {
      throw new Error('filter not found or still not implemented')
    }
    super(filter.filterLocator, 'Filter Locator')
    this.filter = filter
  }

  async expandFilter() {
    await this.formElement.click()
  }

  async clickOption(option) {
    const optionKey = Object.keys(this.filter.options).find((key) => this.filter.options[key] === option)

    const optionButton = new Button(`${this.filter.filterLocator}//*[text()="${this.filter.options[optionKey]}"]`, `${option} Filter Option`)
    await optionButton.click()
  }
}

module.exports = FilterForm
