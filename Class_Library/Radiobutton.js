const BaseElement = require('./BaseElement.js')
const logger = require('../logger.js')

class RadioButton extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async select() {
    logger.info(`Selecting ${this.name}`)
    const element = await this._getElement()
    const isSelected = await element.isSelected()
    if (!isSelected) {
      await element.click()
      logger.debug(`${this.name} selected.`)
    } else {
      logger.debug(`${this.name} is already selected.`)
    }

    logger.info('Select operation complete')
  }

  async unSelect() {
    logger.info(`Unselecting ${this.name}`)
    const element = await this._getElement()
    const isSelected = await element.isSelected()
    if (isSelected) {
      await element.click()
      logger.debug(`${this.name} unselected.`)
    } else {
      logger.debug(`${this.name} is already not selected.`)
    }

    logger.info('Unselecting operation complete')
  }
}

module.exports = RadioButton
