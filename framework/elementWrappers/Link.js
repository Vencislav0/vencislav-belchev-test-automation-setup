import logger from '../logger'
import { BaseElement } from './BaseElement'

export class Link extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async getHref(page) {
    const href = await (await this._getElement(page)).getAttribute('href')
    logger.debug(`${this.name} href: ${href}`)
    return href
  }
}
