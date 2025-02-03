const BaseElement = require('./BaseElement.js')
const { logger } = require('../logger.js')

class BaseForm {
  constructor(selector, name) {
    this.selector = selector
    this.name = name
    this.formElement = new BaseElement(selector, name)
  }

  async isVisible() {
    logger.info(`Checking if ${this.name} is visible`)
    const isVisible = await this.formElement.isDisplayed()
    logger.debug(`Form element ${this.name} visability: ${isVisible}`)
    logger.info('Checking visability complete')
    return isVisible
  }
}

module.exports = BaseForm
