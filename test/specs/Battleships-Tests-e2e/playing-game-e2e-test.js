const { assert } = require('chai')
const Browser = require('../../../framework/Browser.js')
const logger = require('../../../framework/logger.js')
const BattleShipPage = require('../../../battleshipPages/BattleshipPage.js')
const OpponentGrid = require('../../../battleshipPages/OpponentGrid.js')
const PlayerGrid = require('../../../battleshipPages/PlayerGrid.js')
const { failingStep } = require('../../../framework/util-functions.js')
const NotificationsForm = require('../../../battleshipPages/NotificationsForm.js')

describe('Battle Ships Tests e2e', () => {
  let battleshipPage
  let opponent
  let player
  let randomRow
  let randomCell

  beforeEach(async () => {
    battleshipPage = new BattleShipPage()
    notificationsForm = new NotificationsForm()
    opponent = await OpponentGrid.setupOpponentGrid()
    player = await PlayerGrid.setupPlayerGrid()
  })

  it('Should select random opponent and arrange ships correctly when randomised multiple times', async () => {
    await logger.logStep('Opening Battleship page')
    await Browser.openUrl('https://battleship-game.org/en')

    logger.logStep('Accepting data consent if needed')
    await battleshipPage.clickConsentButtonIfDisplayed()

    await logger.logStep('Choosing random opponent')
    await battleshipPage.clickRandomOpponentButton()

    await logger.logStep('Randomising Ship positions multiple times')
    await battleshipPage.clickRandomiseMultipleTimes()
  })

  it('Playing the game', async () => {
    await logger.logStep('Opening Battleship page')
    await Browser.openUrl('https://battleship-game.org/en')

    await logger.logStep('Clicking Play button and waiting for player to join')
    await battleshipPage.clickPlayButton()

    while (true) {
      browser.waitUntil(
        async () => {
          return await notificationsForm.isInitialTurnNotifDisplayed()
        },
        { timeout: 50000, interval: 1000, timeoutMsg: 'Couldnt find a match' },
      )

      if (await notificationsForm.isYouLoseNotifDisplayed()) {
        await failingStep('Lost the game, failed to win', 'Failed to win the game of battleships')
        break
      }
      randomRow = Math.floor(Math.random() * 10) + 1
      randomCell = Math.floor(Math.random() * 10)

      try {
        await opponent.selectRandomCellAndClick(randomRow, randomCell)
      } catch (e) {
        logger.error(`Error clicking on the cell at row ${randomRow}, column ${randomCell}:` + e)
        continue
      }
    }
  })
})
