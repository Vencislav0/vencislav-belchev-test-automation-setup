const BaseElement = require('./BaseElement.js')
const logger = require('./logger.js')

class Button extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async isEnabled() {
    logger.debug(`Checking if ${this.name} is enabled`)    
    const isEnabled = await (await this._getElement()).isEnabled()
    logger.debug(`${this.name} enabled: ${isEnabled}.`)    
    return isEnabled
  }
}

module.exports = Button
