const logger = require('./logger.js')

class BaseElement {
  constructor(selector, name) {
    this.selector = selector
    this.name = name
  }

  async _getElement() {
    logger.trace(`Getting element with selector ${this.selector}`)
    return $(this.selector)
  }

  async click() {
    logger.debug(`Clicking ${this.name}`)
    await (await this._getElement()).click()
    logger.debug(`${this.name} element clicked.`)
  }

  async getText() {
    logger.debug(`Fetching text of ${this.name}`)
    const text = await (await this._getElement()).getText()
    logger.debug(`${this.name} element text: ${text}.`)
    return text
  }

  async isEnabled() {
    logger.debug(`Checking if ${this.name} is enabled`)
    const isEnabled = await (await this._getElement()).isEnabled()
    logger.debug(`${this.name} enabled: ${isEnabled}.`)
    return isEnabled
  }

  async isDisplayed() {
    logger.debug(`Checking if ${this.name} is displayed`)
    const isDisplayed = await (await this._getElement()).isDisplayed()
    logger.debug(`${this.name} displayed: ${isDisplayed}.`)
    return isDisplayed
  }

  async sendText(text) {
    logger.debug(`Sending text to ${this.name}`)
    await (await this._getElement()).setValue(text)
    logger.debug(`sent text to ${this.name}: ${text}.`)
  }

  async rightClick() {
    logger.debug(`Performing right click on ${this.name}`)
    await (await this._getElement()).click({ button: 2 })
    logger.debug(`Performed right click on ${this.name}`)
  }

  async doubleClick() {
    logger.debug(`Performing double click on ${this.name}`)
    await (await this._getElement()).doubleClick()
    logger.debug(`Performed double click on ${this.name}`)
  }

  async holdClick(duration) {
    logger.debug(`Performing Click and hold on ${this.name} for ${duration} miliseconds`)

    await browser
      .action('pointer')
      .move({ origin: await this._getElement() })
      .down()
      .pause(duration)
      .up()
      .perform()

    logger.debug(`Released click on ${this.name} after ${duration} milliseconds`)
  }

  async waitForVisible(duration = 5000) {
    logger.debug(`Waiting for ${this.name} to be visible with duration: ${duration}ms`)
    try {
      await (await this._getElement()).waitForDisplayed({ timeout: duration })
      logger.debug(`Element ${this.name} is now visible`)
      return true
    } catch (error) {
      logger.error(`Element ${this.name} was not visible within ${duration}ms: ${error.message}`)
      return false
    }
  }

  async waitForEnabled(duration = 5000) {
    logger.debug(`Waiting for ${this.name} to be enabled with duration: ${duration}ms`)
    try {
      await (await this._getElement()).waitForEnabled({ timeout: duration })
      logger.debug(`Element ${this.name} is now enabled`)
      return true
    } catch (error) {
      logger.error(`Element ${this.name} was not enabled within ${duration}ms: ${error.message}`)
      return false
    }
  }

  async getAttribute(attribute) {
    logger.debug(`Fetching attribute ${attribute} value from ${this.name}`)
    const value = await (await this._getElement()).getAttribute(attribute)
    logger.debug(`Fetched value: ${value} from attribute ${attribute}`)
    return value
  }

  async getValue() {
    logger.debug(`Fetching value attribute from ${this.name}`)
    const value = await (await this._getElement()).getValue()
    logger.debug(`Fetched value: ${value} from ${this.name}`)
    return value
  }

  async getCSSValue(property) {
    logger.debug(`Fetching value from ${property} CSS property on ${this.name} element`)
    const value = await (await this._getElement()).getCSSProperty(property)
    logger.debug(`Fetched ${property} CSS property from ${this.name} element, result object: ${JSON.stringify(value)}`)
    return value
  }
}

module.exports = BaseElement
