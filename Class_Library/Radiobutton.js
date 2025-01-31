const BaseElement = require('./BaseElement.js')

class RadioButton extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async select() {
    console.log(`Selecting ${this.name}`)
    const element = await this._getElement()
    const isSelected = await element.isSelected()
    if (!isSelected) {
      await element.click()
      console.log(`${this.name} selected.`)
    } else {
      console.log(`${this.name} is already selected.`)
    }
  }

  async unSelect() {
    console.log(`Unselecting ${this.name}`)
    const element = await this._getElement()
    const isSelected = await element.isSelected()
    if (isSelected) {
      await element.click()
      console.log(`${this.name} unselected.`)
    } else {
      console.log(`${this.name} is already not selected.`)
    }
  }
}

module.exports = RadioButton
