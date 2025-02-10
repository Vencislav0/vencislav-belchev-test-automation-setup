const BaseElement = require('./BaseElement.js')
const logger = require('./logger.js')

class Label extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async getText() {
    logger.debug(`Fetching text from ${this.name}`)
    const text = await super.getText()
    logger.debug(`${this.name} text: ${text}`)
    return text
  }
}

module.exports = Label
