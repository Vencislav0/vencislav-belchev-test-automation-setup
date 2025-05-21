import { BaseForm } from '../../../../framework/elementWrappers/BaseForm'
import { Button } from '../../../../framework/elementWrappers/Button'
import { Checkbox } from '../../../../framework/elementWrappers/Checkbox'
import { expect } from '@playwright/test'

export class FilterForm extends BaseForm {
  constructor(filter) {
    if (!filter) {
      throw new Error('Filter doesnt exist or not yet implemented')
    }
    const filterLocator = `//div[@data-filter-id="${filter.filterID}"]`
    super(filterLocator, 'Filter Locator')
    this.seeMoreButton = new Button(`${filterLocator}//div[@class="filter-body-separator"]/a/..`, 'See More Button')
  }

  async clickSeeMoreButton(page) {
    await page.waitForTimeout(500)
    await this.seeMoreButton.click(page)
  }

  async checkCheckbox(page, name) {
    const checkBox = new Checkbox(`//a[@data-name="${name}"]`, `${name} CheckBox`)
    await checkBox.click(page)
  }
}
