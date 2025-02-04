const BaseElement = require('./BaseElement.js')
const logger = require('../logger.js')

class Label extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async getText() {
    logger.debug(`Fetching text from ${this.name}`)
    const text = await super.getText()
    logger.debug(`${this.name} text: ${text}`)
    logger.debug('Fetching text operation complete')
    return text
  }
}

module.exports = Label
