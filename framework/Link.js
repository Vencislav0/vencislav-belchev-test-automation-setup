const BaseElement = require('./BaseElement.js')
const logger = require('../logger.js')

class Link extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async getLink() {
    logger.debug(`Fetching href from ${this.name}`)
    const link = await this.getAttribute('href')
    logger.debug(`${this.name} URL: ${link}`)
    logger.debug('Fetching href operation complete')
    return link
  }
}

module.exports = Link
