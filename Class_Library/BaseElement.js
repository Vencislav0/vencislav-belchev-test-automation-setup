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
    logger.info(`Clicking ${this.name}`)
    const selector = await this._getElement()
    await selector.click()
    logger.debug(`${this.name} element clicked.`)
    logger.info('Clicking operation complete')
  }

  async getText() {
    logger.info(`Fetching text of ${this.name}`)
    const selector = await this._getElement()
    const text = await selector.getText()
    logger.debug(`${this.name} element text: ${text}.`)
    logger.info('Fetching text operation complete')
    return text
  }

  async isVisible() {
    logger.info(`Checking if ${this.name} is visible`)
    const selector = await this._getElement()
    const isDisplayed = await selector.isDisplayed()
    logger.debug(`${this.name} element displayed: ${isDisplayed}.`)
    logger.info('Checking visability operation complete')
    return isDisplayed
  }

  async isEnabled() {
    logger.info(`Checking if ${this.name} is enabled`)
    const element = await this._getElement()
    const isEnabled = await element.isEnabled()
    logger.debug(`${this.name} enabled: ${isEnabled}.`)
    logger.info('Checking availability operation complete')
    return isEnabled
  }

  async sendText(text) {
    logger.info(`Sending text to ${this.name}`)
    const element = await this._getElement()
    await element.setValue(text)
    logger.debug(`sent text to ${this.name}: ${text}.`)
    logger.info('Sending text operation complete.')
  }

  async rightClick() {
    logger.info(`Performing right click on ${this.name}`)
    const element = await this._getElement()
    await element.click({ button: 2 })
    logger.debug(`Performed right click on ${this.name}`)
    logger.info('Right click operation complete')
  }

  async doubleClick() {
    logger.info(`Performing double click on ${this.name}`)
    const element = await this._getElement()
    await element.doubleClick()
    logger.debug(`Performed double click on ${this.name}`)
    logger.info('Double click operation complete')
  }

  async holdClick(duration) {
    logger.debug(`Performing Click and hold on ${this.name} for ${duration} miliseconds`)

    const element = await this._getElement()
    await browser.action('pointer').move({ origin: element }).down().pause(duration).up().perform()

    logger.debug(`Released click on ${this.name} after ${duration} milliseconds`)
    logger.info('Click hold operation complete')
  }

  async waitForVisible(duration) {
    logger.info(`Waiting for ${this.name} to be visible with duration: ${duration}ms`)
    const element = await this._getElement()
    const isVisible = await element.waitForDisplayed({ timeout: duration })
    if (isVisible) {
      logger.debug(`Element ${this.name} is now visible`)
    } else {
      logger.error(`Element ${this.name} was not visible within ${duration}ms`)
    }

    logger.info('Waiting for visability complete.')
  }

  async waitForEnabled(duration) {
    logger.info(`Waiting for ${this.name} to be enabled with duration: ${duration}ms`)
    const element = await this._getElement()
    const isEnabled = await element.waitForEnabled({ timeout: duration })
    if (isEnabled) {
      logger.debug(`Element ${this.name} is now enabled`)
    } else {
      logger.error(`Element ${this.name} was not enabled within ${duration}ms`)
    }

    logger.info('Waiting for availability complete')
  }

  async getAttribute(attribute) {
    logger.info(`Fetching attribute ${attribute} value from ${this.name}`)
    const element = await this._getElement()
    const value = await element.getAttribute(attribute)
    logger.debug(`Fetched value: ${value} from attribute ${attribute}`)
    logger.info(`Fetching attribute from ${this.name} complete`)
    return value
  }

  async getCSSValue(property) {
    logger.info(`Fetching value from ${property} CSS property on ${this.name} element`)
    const element = await this._getElement()
    const value = await element.getCSSProperty(property)
    logger.debug(`Fetched ${property} CSS property from ${this.name} element, result object: ${value}`)
    logger.info('Fetching CSS value complete')
    return value
  }
}

module.exports = BaseElement
