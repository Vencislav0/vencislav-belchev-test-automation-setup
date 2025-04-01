const GameForm = require('../steam_pages/category/browse_section/game/GameForm.js')
const BrowseSectionForm = require('../steam_pages/category/browse_section/BrowseSectionForm.js')
const GeneralSteps = require('./GeneralSteps.js')

class BrowseSectionSteps extends GeneralSteps {
  constructor() {
    super()
  }

  async selectGameWithHighestDiscountOrPrice() {
    const gamesCount = await new BrowseSectionForm().getGamesCount()
    let chosenGame
    let highestDiscount = 0
    let highestPrice = 0

    for (let i = 1; i <= gamesCount; i++) {
      const game = new GameForm(i)
      const gameDiscount = await this.getDiscountNumericValue(await game.getGameDiscount())

      if (gameDiscount && gameDiscount < highestDiscount) {
        highestDiscount = gameDiscount
        chosenGame = game
      }
    }

    if (chosenGame) {
      highestPrice = await this.getPriceNumericValue(await chosenGame.getGamePrice())
      await chosenGame.clickGameImage()
      return [highestDiscount, highestPrice]
    } else {
      for (let i = 1; i <= gamesCount; i++) {
        const game = new GameForm(i)
        const gamePrice = await this.getPriceNumericValue(await game.getGamePrice())

        if (gamePrice && gamePrice > highestPrice) {
          highestPrice = gamePrice
          chosenGame = game
        }
      }
    }

    if (chosenGame) {
      await chosenGame.clickGameImage()
    }

    return [highestDiscount, highestPrice]
  }
}

module.exports = BrowseSectionSteps
