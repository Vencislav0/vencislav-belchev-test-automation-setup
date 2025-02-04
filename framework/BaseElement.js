const logger = require('../logger.js')


class BaseElement {
  constructor(selector, name) {
    this.selector = selector
    this.name = name   
  }

  async _getElement() {
    logger.debug(`Getting element with selector ${this.selector}`)
    return $(this.selector)
  }

  async click() {
    logger.debug(`Clicking ${this.name}`)
    const selector = await this._getElement()
    await selector.click()
    logger.debug(`${this.name} element clicked.`)
    logger.debug('Clicking operation complete')
  }

  async getText() {
    logger.debug(`Fetching text of ${this.name}`)
    const selector = await this._getElement()
    const text = await selector.getText()
    logger.debug(`${this.name} element text: ${text}.`)
    logger.debug('Fetching text operation complete')
    return text
  }

  async isVisible() {
    logger.debug(`Checking if ${this.name} is visible`)
    const selector = await this._getElement()
    const isDisplayed = await selector.isDisplayed()
    logger.debug(`${this.name} element displayed: ${isDisplayed}.`)
    logger.debug('Checking visability operation complete')
    return isDisplayed
  }

  async isEnabled() {
    logger.debug(`Checking if ${this.name} is enabled`)
    const element = await this._getElement()
    const isEnabled = await element.isEnabled()
    logger.debug(`${this.name} enabled: ${isEnabled}.`)
    logger.debug('Checking availability operation complete')
    return isEnabled
  }

  async isDisplayed() {
    logger.debug(`Checking if ${this.name} is displayed`)
    const element = await this._getElement()
    const isDisplayed = await element.isDisplayed()
    logger.debug(`${this.name} displayed: ${isDisplayed}.`)
    logger.debug('Checking visability operation complete')
    return isDisplayed
  }

  async sendText(text) {
    logger.debug(`Sending text to ${this.name}`)
    const element = await this._getElement()
    await element.setValue(text)
    logger.debug(`sent text to ${this.name}: ${text}.`)
    logger.debug('Sending text operation complete.')
  }

  async rightClick() {
    logger.debug(`Performing right click on ${this.name}`)
    const element = await this._getElement()
    await element.click({ button: 2 })
    logger.debug(`Performed right click on ${this.name}`)
    logger.debug('Right click operation complete')
  }

  async doubleClick() {
    logger.debug(`Performing double click on ${this.name}`)
    const element = await this._getElement()
    await element.doubleClick()
    logger.debug(`Performed double click on ${this.name}`)
    logger.debug('Double click operation complete')
  }

  async holdClick(duration) {
    logger.debug(`Performing Click and hold on ${this.name} for ${duration} miliseconds`)

    const element = await this._getElement()
    await browser.action('pointer').move({ origin: element }).down().pause(duration).up().perform()

    logger.debug(`Released click on ${this.name} after ${duration} milliseconds`)
    logger.debug('Click hold operation complete')
  }

  async waitForVisible(duration) {
    logger.debug(`Waiting for ${this.name} to be visible with duration: ${duration}ms`)
    const element = await this._getElement()
    const isVisible = await element.waitForDisplayed({ timeout: duration })
    if (isVisible) {
      logger.debug(`Element ${this.name} is now visible`)
    } else {
      logger.error(`Element ${this.name} was not visible within ${duration}ms`)
    }

    logger.debug('Waiting for visability complete.')
  }

  async waitForEnabled(duration) {
    logger.debug(`Waiting for ${this.name} to be enabled with duration: ${duration}ms`)
    const element = await this._getElement()
    const isEnabled = await element.waitForEnabled({ timeout: duration })
    if (isEnabled) {
      logger.debug(`Element ${this.name} is now enabled`)
    } else {
      logger.error(`Element ${this.name} was not enabled within ${duration}ms`)
    }

    logger.debug('Waiting for availability complete')
  }

  async getAttribute(attribute) {
    logger.debug(`Fetching attribute ${attribute} value from ${this.name}`)
    const element = await this._getElement()
    const value = await element.getAttribute(attribute)
    logger.debug(`Fetched value: ${value} from attribute ${attribute}`)
    logger.debug(`Fetching attribute from ${this.name} complete`)
    return value
  }

  async getValue(){
    logger.debug(`Fetching value attribute from ${this.name}`)
    const element = await this._getElement()
    const value = await element.getValue()
    logger.debug(`Fetched value: ${value} from ${this.name}`)
    logger.debug(`Fetching value operation complete.`)
    return value
  }

  async getCSSValue(property) {
    logger.debug(`Fetching value from ${property} CSS property on ${this.name} element`)
    const element = await this._getElement()
    const value = await element.getCSSProperty(property)
    logger.debug(`Fetched ${property} CSS property from ${this.name} element, result object: ${JSON.stringify(value)}`)
    logger.debug('Fetching CSS value complete')
    return value
  }
}

module.exports = BaseElement
