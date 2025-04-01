const BaseForm = require('../../framework/BaseForm.js')
const Label = require('../../framework/Label.js')
const Button = require('../../framework/Button.js')

class HomePage extends BaseForm {
  constructor() {
    super('//div[@class="responsive_page_content"]', 'Home Page Elements Container')
    this.categoriesLabel = new Label('//a[@class="pulldown_desktop" and text()="Categories"]', 'Categories Label')
    this.installSteamButton = new Button('//div[@class="header_installsteam_btn_content"]', 'install Steam Button')
  }

  async hoverOnCategoryLabel() {
    await this.categoriesLabel.moveToElement()
  }

  async clickSteamInstallButton() {
    await this.installSteamButton.click()
  }
}

module.exports = HomePage
