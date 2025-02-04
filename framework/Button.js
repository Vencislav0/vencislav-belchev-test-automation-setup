const BaseElement = require('./BaseElement.js')
const logger = require('../logger.js')

class Button extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async isEnabled() {
    logger.debug(`Checking if ${this.name} is enabled`)
    const element = await this._getElement()
    const isEnabled = await element.isEnabled()
    logger.debug(`${this.name} enabled: ${isEnabled}.`)
    logger.debug('Checking for availability complete')
    return isEnabled
  }
}

module.exports = Button
