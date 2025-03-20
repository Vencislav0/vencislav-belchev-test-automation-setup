const Button = require('../../framework/elementWrappers/Button.js')
const BaseForm = require('../../framework/BaseForm.js')
const Dropdown = require('../../framework/elementWrappers/Dropdown.js')
const Label = require('../../framework/elementWrappers/Label.js')

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
    if (await this.cookiesAcceptButton.isDisplayed()) {
      await this.cookiesAcceptButton.click()
    }
  }

  async dissmissAccountLoginPopUpIfNeeded() {
    if (await this.logIntoAccountDissmissButton.isDisplayed()) {
      await this.logIntoAccountDissmissButton.click()
    }
  }
}

module.exports = HomePage
