import logger from '../logger'
import { BaseElement } from './BaseElement'

export class Checkbox extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async check(page) {
    logger.debug(`Checking ${this.name}`)
    await (await this._getElement(page)).check()
  }

  async uncheck(page) {
    logger.debug(`Unchecking ${this.name}`)
    await (await this._getElement(page)).uncheck()
  }

  async isChecked(page) {
    const isItChecked = await (await this._getElement(page)).isChecked()
    logger.debug(`${this.name} Checked: ${isItChecked}`)
    return isItChecked
  }
}
