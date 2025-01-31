class Browser {
  async openUrl(path) {
    await browser.url(path)
    console.log(`Opened URL: ${path}.`)
  }

  async getUrl() {
    const url = await browser.getUrl()
    console.log(`Current page url: ${url}.`)
    return url
  }

  async windowMaximize() {
    await browser.maximizeWindow()
    console.log('Window maximized.')
  }

  async refreshPage() {
    await browser.refresh()
    console.log('Refreshed page.')
  }

  async goBack() {
    await browser.back()
    console.log('Navigated back')
  }

  async goForward() {
    await browser.forward()
    console.log('Navigated Forward')
  }

  async acceptAlert() {
    await browser.acceptAlert()
    console.log('Accepted Alert.')
  }

  async dismissAlert() {
    await browser.dismissAlert()
    console.log('Dismissed Alert.')
  }

  async getAlertText() {
    const text = await browser.getAlertText()
    console.log(`Alert text: ${text}`)
    return text
  }

  async windowSize(width, height) {
    await browser.setWindowSize(width, height)
    console.log(`Set window size to ${width}x${height}`)
  }

  async setCookie(key, value) {
    await browser.setCookies({ key, value })
    console.log(`set cookie: ${key}=${value}`)
  }

  async getCookie(key) {
    await browser.getCookies([key])
    console.log(`Retrieved cookie: ${key}`)
  }

  async deleteCookie(key) {
    await browser.deleteCookies([key])
    console.log(`Deleted cookie: ${key}`)
  }

  async clearCookies() {
    await browser.deleteCookies()
    console.log('Deleted all cookies')
  }

  async getLocalStorageItem(key) {
    const item = await browser.localStorage('GET', key)
    console.log(`Retrived local storage item: ${key}.`)
    return item
  }

  async setLocalStorageItem(key, value) {
    await browser.localStorage('POST', { key: key, value: value })
    console.log(`Set local storage item: ${key}=${value}.`)
  }

  async deleteLocalStorageItem(key) {
    await browser.localStorage('DELETE', key)
    console.log(`Deleted local storage item: ${key}.`)
  }

  async clearLocalStorage() {
    await browser.localStorage('DELETE')
    console.log(`Cleared local storage.`)
  }
}

module.exports = Browser
