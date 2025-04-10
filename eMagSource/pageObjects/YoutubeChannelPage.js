const Button = require('../../framework/elementWrappers/Button.js')
const BaseForm = require('../../framework/BaseForm.js')
const Timeouts = require('../../framework/timeouts.js')

class YoutubeChannelPage extends BaseForm {
  constructor() {
    super('//ytd-page-manager[@id="page-manager"]', 'Youtube Channel Container')
    this.youtubeAcceptCookiesButton = new Button('(//span[text()="Accept all"])[1]', 'Youtube Accept Cookies Button')
  }

  async acceptYoutubeCookiesIfNeeded() {
    if (await this.youtubeAcceptCookiesButton.isDisplayed()) {
      await this.youtubeAcceptCookiesButton.click()
      await browser.waitUntil(
        async () => {
          return (await browser.isLoading()) === false
        },
        { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Couldnt load page' },
      )
    }
  }
}

module.exports = YoutubeChannelPage
