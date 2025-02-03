const BaseElement = require('./BaseElement.js')
const { logger } = require('../logger.js')

class CheckBox extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async check() {
    logger.info(`Performing check on ${this.name}`)
    const element = await this._getElement()
    const isChecked = await element.isSelected()
    if (!isChecked) {
      await element.click()
      logger.debug(`${this.name} checked.`)
    } else {
      logger.debug(`${this.name} is already checked.`)
    }
    logger.info('Checking operation complete')
  }

  async unCheck() {
    logger.info(`Unchecking on ${this.name}`)
    const element = await this._getElement()
    const isChecked = await element.isSelected()
    if (isChecked) {
      await element.click()
      logger.debug(`${this.name} unchecked.`)
    } else {
      logger.debug(`${this.name} is already unchecked.`)
    }
    logger.info('Unchecking operation complete')
  }
}

module.exports = CheckBox
