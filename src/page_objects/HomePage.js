import { BaseForm } from '../../framework/elementWrappers/BaseForm'
import { Button } from '../../framework/elementWrappers/Button'
import { Label } from '../../framework/elementWrappers/Label'
import logger from '../../framework/logger'

export class HomePage extends BaseForm {
  constructor() {
    super('div[class="main-container"]', 'Home Page Main Container')
    this.categoriesMenu = new Label('//div[contains(text(), "Kатегории")]', 'Category Menu')
    this.acceptCookiesButton = new Button('//button[contains(@class, "js-accept") and text()="Приеми всички"]', 'Accept Cookies Button')
    this.accountLoginDismissButton = new Button('//button[contains(@class, "js-dismiss-login")]', 'Login Dismiss Button')
    this.favoritesMenuItem = new Button('//i[contains(@class, "heart navbar-icon")]', 'Favorites Menu Item')
    this.heartIconNumber = new Label('//a[@id="my_wishlist"]//span[@class="jewel jewel-danger"]', 'Number Label On Favorites Menu Item')
  }

  async hoverOnCategoryMenu(page) {
    await this.categoriesMenu.hover(page)
  }

  async acceptCookiesIfNeeded(page) {
    try {
      await this.acceptCookiesButton.waitForState(page, 'visible', 5000)
      await this.acceptCookiesButton.click(page)
    } catch (er) {
      logger.warn('Failed to find or accept cookies form within the timeout period, proceding without accepting cookies')
    }
  }

  async dismissAccountLoginIfNeeded(page) {
    try {
      await this.accountLoginDismissButton.waitForState(page, 'visible', 5000)
      await this.accountLoginDismissButton.click(page)
    } catch (er) {
      logger.warn('Failed to find or dismiss account login form within the timeout period, proceding without dismissing login pop up')
    }
  }

  async clickFavoritesMenuItem(page){
    await this.favoritesMenuItem.click(page)
  }

  async getNumberOnHeartIcon(page){
    return this.heartIconNumber.getText(page)
  }
}
