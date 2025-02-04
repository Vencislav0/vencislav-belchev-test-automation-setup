const BaseElement = require('./BaseElement.js')
const logger = require('../logger.js')

class Dropdown extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async selectByText(text) {
    logger.debug(`Selecting option from ${this.name} by text`)
    const element = await this._getElement()
    element.selectByVisibleText(text)
    logger.debug(`selected option from ${this.name} with text: ${text}`)
    logger.debug('Selection by text complete')
  }

  async selectByValue(value) {
    await this._getElement()
    logger.debug(`Selecting option from ${this.name} by value`)
    const element = await this._getElement()
    element.selectByAttribute('value', value)
    logger.debug(`selected option from ${this.name} with value: ${value}`)
    logger.debug('Selection by value complete')
  }
}

module.exports = Dropdown
