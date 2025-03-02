const Button = require('../framework/Button.js')
const BaseForm = require('../framework/BaseForm.js')
const Dropdown = require('../framework/Dropdown.js')

class HomePage extends BaseForm {
  constructor() {
    super('[class = "main-container-outer"]', 'Home Page Main Container')
    this.categoriesMenu = new Dropdown('[class = "navbar-aux-content__departments"]', 'Categories Dropdown Menu')
    this.cookiesAcceptButton = new Button('//button[@class="btn btn-primary btn-block js-accept gtm_h76e8zjgoo"]', 'Accept Cookies Button')
    this.logIntoAccountDissmissButton = new Button('//button[contains(@class, "js-dismiss-login")]', 'Log Into Account Dismiss Button')
  }

  async hoverOnCategoriesMenu() {
    await this.categoriesMenu.moveToElement()
  }

  async acceptCookiesIfNeeded() {
    if (await this.cookiesAcceptButton.isDisplayed()) {
      await this.cookiesAcceptButton.click()
    }
  }

  async dissmissAccountLoginPopUpIfNeeded() {
    if (await this.logIntoAccountDissmissButton.isDisplayed()) {
      this.logIntoAccountDissmissButton.click()
    }
  }
}

module.exports = HomePage
