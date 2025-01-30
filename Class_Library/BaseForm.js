const BaseElement = require('./BaseElement.js')

class BaseForm {
  constructor(selector, name) {
    this.selector = selector
    this.name = name
    this.formElement = new BaseElement(selector, name)
  }

  async isVisible() {
    const isVisible = await this.formElement.isDisplayed()
    console.log(`Form element ${this.name} visability: ${isVisible}`)
    return isVisible
  }
}

module.exports = BaseForm
