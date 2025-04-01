const BaseForm = require('../../framework/BaseForm')
const Button = require('../../framework/Button.js')

class AboutPage extends BaseForm {
  constructor() {
    super('//div[@id="about_header_area"]', 'About Page Content Container')
    this.installSteamButton = new Button('//a[@class="about_install_steam_link"]', 'Install Steam Button')
  }

  async clickInstallSteamButton() {
    await this.installSteamButton.click()
  }
}

module.exports = AboutPage
