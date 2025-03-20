const BaseElement = require('./BaseElement.js')
const logger = require('../logger.js')

class TextBox extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async sendText(text) {
    logger.debug(`Sending text to ${this.name}`)
    await (await this._getElement()).addValue(text)
    logger.debug(`sent text to ${this.name}: ${text}.`)
  }

  async getPlaceHolder() {
    logger.debug(`Getting placeholder of ${this.name}`)
    return this.getAttribute('placeholder')
  }

  async clear() {
    logger.debug(`Clearing ${this.name}`)
    await (await this._getElement()).clearValue()
    logger.debug(`${this.name} cleared.`)
  }
}

module.exports = TextBox
