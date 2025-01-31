const BaseElement = require('./BaseElement.js')

class Button extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async isEnabled() {
    console.log(`Checking if ${this.name} is enabled`)
    const element = await this._getElement()
    const isEnabled = await element.isEnabled()
    console.log(`${this.name} enabled: ${isEnabled}.`)
    return isEnabled
  }
}

module.exports = Button
