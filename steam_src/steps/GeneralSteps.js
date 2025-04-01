const Timeouts = require('../../framework/timeouts.js')
const logger = require('../../framework/logger.js')
const Label = require('../../framework/Label.js')
const fs = require('fs')
const GameForm = require('../steam_pages/category/browse_section/game/GameForm.js')
const BrowseSectionForm = require('../steam_pages/category/browse_section/BrowseSectionForm.js')

class GeneralSteps {
  constructor() {}

  async getPriceNumericValue(priceText) {
    if (priceText !== 'Free To Play' && priceText !== 'Free Demo') {
      const numericValue = parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'))

      return numericValue
    }
    return null
  }

  async getDiscountNumericValue(priceText) {
    if (priceText !== 0 && priceText !== '') {
      const numericValue = parseInt(priceText.replace('%', ''))

      return numericValue
    }

    return null
  }

  async waitUntilPageLoads() {
    await browser.waitUntil(
      async () => {
        return await browser.execute(() => document.readyState === 'complete')
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Couldnt load page' },
    )
  }

  async acceptCookiesIfNeeded() {
    try {
      const acceptCookiesButton = new Label('//div[@id="acceptAllButton"]', 'Accept Cookies Button')
      await browser.waitUntil(
        async () => {
          return await acceptCookiesButton.isDisplayed()
        },
        { timeout: Timeouts.DEFAULT_WAIT_TIMEOUT, timeoutMsg: 'Couldnt load cookies accept form on time' },
      )
      await acceptCookiesButton.click()
    } catch (er) {
      logger.warn('Failed to find or accept cookies form within the timeout period, proceding without accepting cookies')
    }
  }

  async waitForDownloadToComplete(file) {
    await browser.waitUntil(async () => fs.existsSync(file), { timeout: 20000, timeoutMsg: "Couldn't download the file" })
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

module.exports = GeneralSteps
