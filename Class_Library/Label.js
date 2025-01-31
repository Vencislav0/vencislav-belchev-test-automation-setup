const BaseElement = require('./BaseElement.js')

class Label extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async getText() {
    console.log(`Fetching text from ${this.name}`)
    const text = await super.getText()
    console.log(`${this.name} text: ${text}`)
    return text
  }
}

module.exports = Label
