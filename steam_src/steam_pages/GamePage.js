const BaseForm = require('../../framework/BaseForm.js')
const Label = require('../../framework/Label.js')

class GamePage extends BaseForm {
  constructor() {
    super('//div[@class="page_content_ctn"]', 'Game Page Container')
    this.gameDiscountLabel = new Label('//div[@class="discount_pct"]', 'Game Discount')
    this.gamePriceLabel = new Label('//div[@class="discount_final_price"]', 'Game Price')
    this.gamePriceWithoutDiscount = new Label('//div[@class="game_purchase_price price"]', 'Game Price If No Discount')
  }

  async getGameDiscount() {
    if (await this.gameDiscountLabel.isDisplayed()) {
      return this.gameDiscountLabel.getText()
    } else {
      return null
    }
  }

  async getGamePrice() {
    return this.gamePriceLabel.getText()
  }

  async getGamePriceWithoutDiscount() {
    return this.gamePriceWithoutDiscount.getText()
  }
}

module.exports = GamePage
