const BaseForm = require('../framework/BaseForm.js')
const Button = require('../framework/Button.js')
const DropDown = require('../framework/Dropdown.js')
const CheckBox = require('../framework/Checkbox.js')
const TextBox = require('../framework/TextBox.js')
const Browser = require('../framework/Browser.js')

class BattleshipPage extends BaseForm {
  constructor() {
    super('//div[@class="battlefields clearfix"]', 'Grid Container')
    this.randomNumber = 0
    this.consentDataButton = new Button('//p[@class="fc-button-label" and text()="Consent"]', 'Data Consent Button')
    this.languagesList = new DropDown('//ul[@class="langs"]', 'Languages List')
    this.englishLanguageOption = new Button('a[title="English"]', 'English Option from Language Menu')
    this.markVerifiedEmptyCellsCheckBox = new CheckBox('//dd[@data-name="shoothint"]/input[@id="setting__shoothint"]', 'Mark verified empty cells CheckBox')
    this.compactChatCheckBox = new CheckBox('//dd[@data-name="compactchat"]/input[@id="setting__compactchat"]', 'Combact Chat CheckBox')
    this.randomiseButton = new Button('//span[@class="placeships-variant-link" and text()="Randomise"]', 'Randomise Ships Button')
    this.randomOpponentButton = new Button('//a[@class="battlefield-start-choose_rival-variant-link"]', 'Random Opponent Button')
    this.playButton = new Button('//div[@class="battlefield-start-button"]', 'Play Game Button')
    this.chatTextBox = new TextBox('//input[@class="input input__textarea chat-teletype"]', 'Chat Text Box')
  }

  async switchLanguageToEnglish() {
    await this.languagesList.click()
    await this.englishLanguageOption.click()
  }

  async isMarkVerifiedEmptyCellsChecked() {
    return this.markVerifiedEmptyCellsCheckBox.isSelected()
  }

  async checkCompactChat() {
    await this.compactChatCheckBox.check()
  }

  async isCompactChatChecked() {
    return this.compactChatCheckBox.isSelected()
  }

  async clickRandomOpponentButton() {
    await this.randomOpponentButton.click()
  }

  async clickRandomiseMultipleTimes() {
    this.randomNumber = Math.floor(Math.random() * 15) + 1
    for (let i = 0; i < this.randomNumber; i++) {
      await this.randomiseButton.click()
    }
  }

  async clickPlayButton() {
    await this.playButton.click()
  }

  async clickConsentButtonIfDisplayed() {
    if (await this.consentDataButton.isDisplayed()) {
      await this.consentDataButton.click()
    }
  }

  async sendMessageToChat(message) {
    await this.chatTextBox.sendText(message)
    await Browser.pressKey('Enter')
  }
}

module.exports = BattleshipPage
