import logger from '../logger'
import { BaseElement } from './BaseElement'

export class TextBox extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async type(page, text) {
    logger.debug(`Typing into ${this.name}: ${text}`)
    const element = await this._getElement(page)
    await element.type(text)
  }

  async clear(page) {
    logger.debug(`Typing into ${this.name}: ${text}`)
    const element = await this._getElement(page)
    await element.fill('')
  }
}
