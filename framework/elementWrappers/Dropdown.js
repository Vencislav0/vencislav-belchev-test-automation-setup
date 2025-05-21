import logger from '../logger'
import { BaseElement } from './BaseElement'

export class Dropdown extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async selectByValue(page, value) {
    logger.debug(`Selecting from ${this.name} with value: ${value}`)
    await (await this._getElement(page)).selectOption(value)
  }

  async selectByLabel(page, label) {
    logger.debug(`Selecting from ${this.name} with value: ${value}`)
    await (await this._getElement(page)).selectOption({ label: label })
  }
}
