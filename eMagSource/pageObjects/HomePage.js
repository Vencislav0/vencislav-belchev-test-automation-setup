const Button = require('../../framework/elementWrappers/Button.js')
const BaseForm = require('../../framework/BaseForm.js')
const Dropdown = require('../../framework/elementWrappers/Dropdown.js')
const Label = require('../../framework/elementWrappers/Label.js')
const Timeouts = require('../../framework/timeouts.js')
const logger = require('../../framework/logger.js')

class HomePage extends BaseForm {
  constructor() {
    super('[class = "main-container-outer"]', 'Home Page Main Container')
    this.categoriesMenu = new Dropdown('[class = "navbar-aux-content__departments"]', 'Categories Dropdown Menu')
    this.cookiesAcceptButton = new Button('//button[@class="btn btn-primary btn-block js-accept gtm_h76e8zjgoo"]', 'Accept Cookies Button')
    this.logIntoAccountDissmissButton = new Button('//button[contains(@class, "js-dismiss-login")]', 'Log Into Account Dismiss Button')
    this.heartIconNumber = new Label('//span[@class="jewel jewel-danger"]', 'Number on the Heart Icon')
    this.heartIconLabel = new Label('//a[@id="my_wishlist"]', 'Heart Icon')
  }

  async hoverOnCategoriesMenu() {
    await this.categoriesMenu.moveToElement()
  }

  async clickHeartMenuItem() {
    await this.heartIconLabel.click()
  }

  async getNumberOnHeartIcon() {
    return parseInt(await this.heartIconNumber.getText())
  }

  async acceptCookiesIfNeeded() {
    try {
      await browser.waitUntil(
        async () => {
          return await this.cookiesAcceptButton.isDisplayed()
        },
        { timeout: Timeouts.EXTRA_SHORT_TIMEOUT, timeoutMsg: 'Couldnt load cookies accept form on time' },
      )
      await this.cookiesAcceptButton.click()
    } catch (er) {
      logger.warn('Failed to find or accept cookies form within the timeout period, proceding without accepting cookies')
    }
  }

  async dissmissAccountLoginPopUpIfNeeded() {
    try {
      await browser.waitUntil(
        async () => {
          return await this.logIntoAccountDissmissButton.isDisplayed()
        },
        { timeout: Timeouts.EXTRA_SHORT_TIMEOUT, timeoutMsg: 'Couldnt load cookies accept form on time' },
      )
      await this.logIntoAccountDissmissButton.click()
    } catch (er) {
      logger.warn('Failed to find or dismiss account login form within the timeout period, proceding without dismissing login pop up')
    }
  }
}

module.exports = HomePage
