class BaseElement {
  constructor(selector, name) {
    this.selector = selector
    this.name = name
  }

  async _getElement() {
    console.log(`Getting element with selector ${this.selector}`)
    return $(this.selector)
  }

  async click() {
    console.log(`Clicking ${this.name}`)
    const selector = await this._getElement()
    await selector.click()
    console.log(`${this.name} element clicked.`)
  }

  async getText() {
    console.log(`Fetching text of ${this.name}`)
    const selector = await this._getElement()
    const text = await selector.getText()
    console.log(`${this.name} element text: ${text}.`)
    return text
  }

  async isVisible() {
    console.log(`Checking if ${this.name} is visible`)
    const selector = await this._getElement()
    const isDisplayed = await selector.isDisplayed()
    console.log(`${this.name} element displayed: ${isDisplayed}.`)
    return isDisplayed
  }

  async isEnabled() {
    console.log(`Checking if ${this.name} is enabled`)
    const element = await this._getElement()
    const isEnabled = await element.isEnabled()
    console.log(`${this.name} enabled: ${isEnabled}.`)
    return isEnabled
  }

  async sendText(text) {
    console.log(`Sending text to ${this.name}`)
    const element = await this._getElement()
    await element.setValue(text)
    console.log(`sent text to ${this.name}: ${text}.`)
  }

  async rightClick() {
    console.log(`Performing right click on ${this.name}`)
    const element = await this._getElement()
    await element.click({ button: 2 })
    console.log(`Performed right click on ${this.name}`)
  }

  async doubleClick() {
    console.log(`Performing double click on ${this.name}`)
    const element = await this._getElement()
    await element.doubleClick()
    console.log(`Performed double click on ${this.name}`)
  }

  async holdClick(duration) {
    console.log(`Performing Click and hold on ${this.name} for ${duration} miliseconds`)

    const element = await this._getElement()
    await browser.action('pointer').move({ origin: element }).down().pause(duration).up().perform()

    console.log(`Released click on ${this.name} after ${duration} milliseconds`)
  }

  async waitForVisible(duration) {
    console.log(`Waiting for ${this.name} to be visible with duration: ${duration}ms`)
    const element = await this._getElement()
    const isVisible = await element.waitForDisplayed({ timeout: duration })
    if (isVisible) {
      console.log(`Element ${this.name} is now visible`)
    } else {
      console.error(`Element ${this.name} was not visible within ${duration}ms`)
    }
  }

  async waitForEnabled(duration) {
    console.log(`Waiting for ${this.name} to be enabled with duration: ${duration}ms`)
    const element = await this._getElement()
    const isEnabled = await element.waitForEnabled({ timeout: duration })
    if (isEnabled) {
      console.log(`Element ${this.name} is now enabled`)
    } else {
      console.error(`Element ${this.name} was not enabled within ${duration}ms`)
    }
  }
}

module.exports = BaseElement
