const BaseElement = require('./BaseElement.js')

class Dropdown extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async selectByText(text) {
    console.log(`Selecting option from ${this.name} by text`)
    const element = await this._getElement()
    element.selectByVisibleText(text)
    console.log(`selected option from ${this.name} with text: ${text}`)
  }

  async selectByValue(value) {
    await this._getElement()
    console.log(`Selecting option from ${this.name} by value`)
    const element = await this._getElement()
    element.selectByAttribute('value', value)
    console.log(`selected option from ${this.name} with value: ${value}`)
  }
}

module.exports = Dropdown
