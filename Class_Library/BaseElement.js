class BaseElement {
  constructor(selector, name) {
    this.selector = selector
    this.name = name
  }

  async click(selector) {
    selector = await $(this.selector)
    await selector.click()
    console.log(`${this.name} element clicked.`)
  }

  async getText(selector) {
    selector = await $(this.selector)
    const text = await selector.getText()
    console.log(`${this.name} element text: ${text}.`)
    return text
  }

  async isVisible(selector) {
    selector = await $(this.selector)
    const isDisplayed = await selector.isDisplayed()
    console.log(`${this.name} element displayed: ${isDisplayed}.`)
    return isDisplayed
  }
}

module.exports = BaseElement
