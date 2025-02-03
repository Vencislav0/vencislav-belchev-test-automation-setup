const BaseElement = require('./BaseElement.js')
const { logger } = require('../logger.js')

class Link extends BaseElement {
  constructor(selector, name) {
    super(selector, name)
  }

  async getLink() {
    logger.info(`Fetching href from ${this.name}`)
    const link = await this.getAttribute('href')
    logger.debug(`${this.name} URL: ${link}`)
    logger.info('Fetching href operation complete')
    return link
  }
}

module.exports = Link
