import logger from '../logger'
import { Label } from './Label'

export class BaseForm {
  constructor(selector, name) {
    this.selector = selector
    this.name = name
    this.formElement = new Label(this.selector, this.name)
  }

  async isVisible(page) {
    logger.debug(`Checking if form is visible`)
    const isItVisible = await this.formElement.waitForState(page, 'visible')
    logger.debug(`Form element ${this.name} visability: ${isItVisible}`)
    logger.debug('Checking visability complete')
    return isItVisible
  }
}
