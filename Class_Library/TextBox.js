const BaseElement = require('./BaseElement.js')

class TextBox extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async sendText(text) {
    console.log(`Sending text to ${this.name}`)
    const element = await this._getElement()
    await element.setValue(text)
    console.log(`sent text to ${this.name}: ${text}.`)
  }

  async clear() {
    console.log(`Clearing ${this.name}`)
    const element = await this._getElement()
    await element.clearValue()
    console.log(`${this.name} cleared.`)
  }
}

module.exports = TextBox
