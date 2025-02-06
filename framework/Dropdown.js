const BaseElement = require('./BaseElement.js')
const logger = require('./logger.js')

class Dropdown extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async selectByText(text) {
    logger.debug(`Selecting option from ${this.name} by text`)    
    await (await this._getElement()).selectByVisibleText(text)
    logger.debug(`selected option from ${this.name} with text: ${text}`)   
  }

  async selectByValue(value) {   
    logger.debug(`Selecting option from ${this.name} by value`)    
    await (await this._getElement()).selectByAttribute('value', value)
    logger.debug(`selected option from ${this.name} with value: ${value}`)    
  }
}

module.exports = Dropdown
