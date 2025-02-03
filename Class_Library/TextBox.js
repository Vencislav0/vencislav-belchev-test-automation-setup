const BaseElement = require('./BaseElement.js')
const { logger } = require('../logger.js')

class TextBox extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async sendText(text) {
    logger.info(`Sending text to ${this.name}`)
    const element = await this._getElement()
    await element.setValue(text)
    logger.debug(`sent text to ${this.name}: ${text}.`)
    logger.info('Sending text operation complete')
  }

  async clear() {
    logger.info(`Clearing ${this.name}`)
    const element = await this._getElement()
    await element.clearValue()
    logger.debug(`${this.name} cleared.`)
    logger.info('Clearing field operation complete')
  }
}

module.exports = TextBox
