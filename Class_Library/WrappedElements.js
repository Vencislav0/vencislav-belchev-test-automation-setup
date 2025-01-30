const BaseElement = require('./BaseElement.js')

class Button extends BaseElement {
  constructor(selector) {
    super(selector, 'Button')
  }

  async isEnabled() {
    const element = await $(this.selector)
    const isEnabled = await element.isEnabled()
    console.log(`${this.name} enabled: ${isEnabled}.`)
    return isEnabled
  }
}

class CheckBox extends BaseElement {
  constructor(selector) {
    super(selector, 'CheckBox')
  }

  async check() {
    const element = await $(this.selector)
    const isChecked = await element.isSelected()
    if (!isChecked) {
      await element.click()
      console.log(`${this.name} checked.`)
    } else {
      console.log(`${this.name} is already checked.`)
    }
  }

  async unCheck() {
    const element = await $(this.selector)
    const isChecked = await element.isSelected()
    if (isChecked) {
      await element.click()
      console.log(`${this.name} unchecked.`)
    } else {
      console.log(`${this.name} is already unchecked.`)
    }
  }
}

class Dropdown extends BaseElement {
  constructor(selector) {
    super(selector, 'Dropdown')
  }

  async selectByText(text) {
    const element = await $(this.selector)
    element.selectByVisibleText(text)
    console.log(`selected option from ${this.name} with text: ${text}`)
  }

  async selectByValue(value) {
    const element = await $(this.selector)
    element.selectByAttribute('value', value)
    console.log(`selected option from ${this.name} with value: ${value}`)
  }
}

class Label extends BaseElement {
  constructor(selector) {
    super(selector, 'Label')
  }

  async getText() {
    const text = await super.getText()
    console.log(`${this.name} text: ${text}`)
    return text
  }
}

class Link extends BaseElement {
  constructor(selector) {
    super(selector, 'Link')
  }

  async getLink() {
    const element = await $(this.selector)
    const link = element.getAttribute('href')
    console.log(`${this.name} URL: ${link}`)
    return link
  }
}

class RadioButton extends BaseElement {
  constructor(selector) {
    super(selector, 'Radio Button')
  }

  async select() {
    const element = await $(this.selector)
    const isSelected = await element.isSelected()
    if (!isSelected) {
      await element.click()
      console.log(`${this.name} selected.`)
    } else {
      console.log(`${this.name} is already selected.`)
    }
  }

  async unSelect() {
    const element = await $(this.selector)
    const isSelected = await element.isSelected()
    if (isSelected) {
      await element.click()
      console.log(`${this.name} unselected.`)
    } else {
      console.log(`${this.name} is already not selected.`)
    }
  }
}

class TextBox extends BaseElement {
  constructor(selector) {
    super(selector, 'TextBox')
  }

  async sendText(text) {
    const element = await $(this.selector)
    await element.setValue(text)
    console.log(`sent text to ${this.name}: ${text}.`)
  }

  async clear() {
    const element = await $(this.selector)
    await element.clearValue()
    console.log(`${this.name} cleared.`)
  }
}

module.exports = {
  Button,
  CheckBox,
  Dropdown,
  Label,
  Link,
  RadioButton,
  TextBox,
}
