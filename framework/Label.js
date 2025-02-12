const BaseElement = require('./BaseElement.js')
const logger = require('./logger.js')

class Label extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async getText() {
    const text = await super.getText()
    return text
  }
}

module.exports = Label
