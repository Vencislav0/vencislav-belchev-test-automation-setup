import { BaseForm } from '../../../../framework/elementWrappers/BaseForm'
import { Button } from '../../../../framework/elementWrappers/Button'
import { Checkbox } from '../../../../framework/elementWrappers/Checkbox'
import { TextBox } from '../../../../framework/elementWrappers/TextBox'

export class PopUpFilterForm extends BaseForm {
  constructor(filter) {
    const filterLocator = `//div[@data-filter-id="${filter.filterID}"]`
    super(filterLocator, 'Filter Locator')
    this.filterButton = new Button(`${filterLocator}//button[text()="Филтрирай"]`, 'Pop Up Filter Button')
    this.searchBox = new TextBox(`${filterLocator}//input[@type="search"]`, 'Pop Up Filter Search Box')
  }

  async sendTextToSearchBox(page, text) {
    await this.searchBox.type(page, text)
  }

  async clickFilterButton(page) {
    await this.filterButton.click(page)
  }

  async checkCheckBox(page, name) {
    const checkBox = new Checkbox(`//a[@data-name="${name}" and @data-position="popup"]`, `${name} CheckBox`)
    await checkBox.click(page)
  }
}
