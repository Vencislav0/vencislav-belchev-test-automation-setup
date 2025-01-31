const BaseElement = require('./BaseElement.js')

class Link extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async getLink() {
    console.log(`Fetching href from ${this.name}`)
    const element = await this._getElement()
    const link = await element.getAttribute('href')
    console.log(`${this.name} URL: ${link}`)
    return link
  }
}

module.exports = Link
