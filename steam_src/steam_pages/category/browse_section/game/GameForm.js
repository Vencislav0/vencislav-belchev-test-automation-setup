const BaseForm = require('../../../../../framework/BaseForm.js')
const Label = require('../../../../../framework/Label.js')

class GameForm extends BaseForm {
  constructor(index) {
    const gameLocator = `(//div[@class="gASJ2lL_xmVNuZkWGvrWg"])[${index}]`
    super(gameLocator, 'Game Form Locator')
    this.gameDiscountLabel = new Label(`${gameLocator}//div[@class="cnkoFkzVCby40gJ0jGGS4"]`, 'Game Discount')
    this.gamePriceLabel = new Label(`${gameLocator}//div[@class="_3j4dI1yA7cRfCvK8h406OB"]`, 'Game Price')
    this.gameImageLabel = new Label(`${gameLocator}//div[@class="yvqq8z2k4i7-Mzx-JHeNC"]`, 'Game Image')
    this.gameTitleLabel = new Label(`${gameLocator}//div[contains(@class, 'StoreSaleWidgetTitle')]`, 'Game Title')
  }

  async getGameDiscount() {
    if (await this.gameDiscountLabel.isDisplayed()) {
      return this.gameDiscountLabel.getText()
    } else {
      return 0
    }
  }

  async getGamePrice() {
    return this.gamePriceLabel.getText()
  }

  async clickGameImage() {
    await this.gameImageLabel.scrollIntoView()
    await this.gameImageLabel.click()
  }
}

module.exports = GameForm
