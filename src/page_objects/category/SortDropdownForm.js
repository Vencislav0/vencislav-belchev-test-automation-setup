import { BaseForm } from '../../../framework/elementWrappers/BaseForm'
import { Button } from '../../../framework/elementWrappers/Button'
import { Label } from '../../../framework/elementWrappers/Label'
import { expect } from '@playwright/test'
import { waitUntil } from '../../../framework/util_functions'
import { Timeouts } from '../../../framework/timeouts'

export class SortDropdownForm extends BaseForm {
  constructor() {
    super('(//span[contains(@class, "sort-control-btn-option")])[1]', 'Sort Dropdown Locator')
    this.sortButton = new Button('(//button[contains(@class, "sort-control-btn")]//span[text()="Подреди по"])[1]/..', 'Sort Expand Button')
    this.descendingOption = new Label('//a[text()="Цена низх."]', 'Descending Option')
    this.newestOption = new Label('//a[text()="Най-нови"]', 'Newest Option')
    this.mostPopularOption = new Label('//a[text()="Най-популярни"]', 'Most Popular Option')
  }

  async sortPriceInDescendingOrder(page) {
    await this.sortButton.click(page)
    await this.descendingOption.click(page)

    await waitUntil(async () => (await this.formElement.getText(page)) === 'Цена низх.', {
      timeout: Timeouts.SHORT_TIMEOUT,
      errorMessage: 'Didnt sort in time',
    })
  }

  async sortItemsByPopularity(page) {
    await this.sortButton.click(page)
    await this.mostPopularOption.click(page)

    await waitUntil(async () => (await this.formElement.getText(page)) === 'Най-популярни', {
      timeout: Timeouts.SHORT_TIMEOUT,
      errorMessage: 'Didnt sort in time',
    })
  }
}
