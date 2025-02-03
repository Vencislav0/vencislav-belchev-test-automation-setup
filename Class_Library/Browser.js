const logger = require('../logger.js')

class Browser {
  async openUrl(path) {
    logger.info(`Opening URL: ${path}.`)
    await browser.url(path)
    logger.debug(`Opened URL: ${path}.`)
  }

  async getUrl() {
    logger.info(`Fetching current page url.`)
    const url = await browser.getUrl()
    logger.debug(`Current page url: ${url}.`)
    return url
  }

  async windowMaximize() {
    logger.info('Maximizing window.')
    await browser.maximizeWindow()
    logger.debug('Window maximized.')
  }

  async refreshPage() {
    logger.info('Refreshing page.')
    await browser.refresh()
    logger.debug('Refreshed page.')
  }

  async goBack() {
    logger.info('Navigating back once.')
    await browser.back()
    logger.debug('Navigated back.')
  }

  async goForward() {
    logger.info('Navigating forward once.')
    await browser.forward()
    logger.debug('Navigated Forward.')
  }

  async acceptAlert() {
    logger.info('Accepting Alert.')
    await browser.acceptAlert()
    logger.debug('Accepted Alert.')
  }

  async dismissAlert() {
    logger.info('Dismissing Alert.')
    await browser.dismissAlert()
    logger.debug('Dismissed Alert.')
  }

  async getAlertText() {
    logger.info('Fetching alert text.')
    const text = await browser.getAlertText()
    logger.debug(`Alert text: ${text}.`)
    return text
  }

  async windowSize(width, height) {
    logger.info('Setting window size.')
    await browser.setWindowSize(width, height)
    logger.debug(`Set window size to ${width}x${height}.`)
  }

  async setCookie(key, value) {
    logger.info('Setting cookie.')
    await browser.setCookies({ key, value })
    logger.debug(`set cookie: ${key}=${value}.`)
  }

  async getCookie(key) {
    logger.info('Retriving cookie.')
    await browser.getCookies([key])
    logger.debug(`Retrieved cookie: ${key}`)
  }

  async deleteCookie(key) {
    logger.info('Deleting cookie.')
    await browser.deleteCookies([key])
    logger.debug(`Deleted cookie: ${key}.`)
  }

  async clearCookies() {
    logger.info('Deleting all cookies.')
    await browser.deleteCookies()
    logger.debug('Deleted all cookies.')
  }

  async getLocalStorageItem(key) {
    logger.info('Retriving local storage item.')
    const item = await browser.localStorage('GET', key)
    logger.debug(`Retrived local storage item: ${key}.`)
    return item
  }

  async setLocalStorageItem(key, value) {
    logger.info('Setting local storage item.')
    await browser.localStorage('POST', { key: key, value: value })
    logger.debug(`Set local storage item: ${key}=${value}.`)
  }

  async deleteLocalStorageItem(key) {
    logger.info('Deleting local storage item.')
    await browser.localStorage('DELETE', key)
    logger.debug(`Deleted local storage item: ${key}.`)
  }

  async clearLocalStorage() {
    logger.info('Clearing all local storage.')
    await browser.localStorage('DELETE')
    logger.debug(`Cleared local storage.`)
  }
}

module.exports = Browser
