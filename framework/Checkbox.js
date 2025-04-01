const BaseElement = require('./BaseElement.js')
const logger = require('./logger.js')

class CheckBox extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async check() {
    logger.debug(`Performing check on ${this.name}`)
    const element = await this._getElement()
    const isChecked = await element.isSelected()
    if (!isChecked) {
      await element.click()
      logger.debug(`${this.name} checked.`)
    } else {
      logger.debug(`${this.name} is already checked.`)
    }
  }

  async unCheck() {
    logger.debug(`Unchecking on ${this.name}`)
    const element = await this._getElement()
    const isChecked = await element.isSelected()
    if (isChecked) {
      await element.click()
      logger.debug(`${this.name} unchecked.`)
    } else {
      logger.debug(`${this.name} is already unchecked.`)
    }
  }

  async isSelected() {
    logger.debug(`Checking if ${this.name} is selected`)
    const isSelected = await (await this._getElement()).isSelected()
    logger.debug(`${this.name} selected: ${isSelected}`)
    return isSelected
  }
}

module.exports = CheckBox
