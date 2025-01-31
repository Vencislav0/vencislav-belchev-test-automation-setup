const BaseElement = require('./BaseElement.js')

class CheckBox extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async check() {
    const element = await this._getElement()
    const isChecked = await element.isSelected()
    if (!isChecked) {
      await element.click()
      console.log(`${this.name} checked.`)
    } else {
      console.log(`${this.name} is already checked.`)
    }
  }

  async unCheck() {
    const element = await this._getElement()
    const isChecked = await element.isSelected()
    if (isChecked) {
      await element.click()
      console.log(`${this.name} unchecked.`)
    } else {
      console.log(`${this.name} is already unchecked.`)
    }
  }
}

module.exports = CheckBox
