const { assert } = require('chai')
const Browser = require('../../../framework/Browser.js')
const logger = require('../../../framework/logger.js')
const BattleShipPage = require('../../../battleshipPages/BattleshipPage.js')
const OpponentGrid = require('../../../battleshipPages/OpponentGrid.js')
const PlayerGrid = require('../../../battleshipPages/PlayerGrid.js')
const { failingStep } = require('../../../framework/util-functions.js')
const NotificationsForm = require('../../../battleshipPages/NotificationsForm.js')

const randomCellGenerator = require('../../../battleshipPages/RandomCellGenerator.js')
let battleshipPage
let opponent
let notificationsForm
let player
let randomRow, randomCell
let cellState
const direction = { value: 0 }

describe('Battle Ships Tests e2e', () => {
  beforeEach(async () => {
    battleshipPage = new BattleShipPage()
    notificationsForm = new NotificationsForm()
    await Browser.windowMaximize()
  })

  it('Should select random opponent and arrange ships correctly when randomised multiple times', async () => {
    await logger.logStep('Opening Battleship page')
    await Browser.openUrl('https://battleship-game.org/en')

    logger.logStep('Accepting data consent if needed')
    await battleshipPage.clickConsentButtonIfDisplayed()

    await logger.logStep('Choosing random opponent')
    await battleshipPage.clickRandomOpponentButton()

    await logger.logStep('Storing all the cell states')
    player = await PlayerGrid.setupPlayerGrid()
    const grid = await player.getAllCellsState()

    await logger.logStep('Randomising Ship positions multiple times')
    await battleshipPage.clickRandomiseMultipleTimes()

    await logger.logStep('Storing the cell states of the grid after randomising')
    const playerGridAfterRandomise = await PlayerGrid.setupPlayerGrid()
    const randomisedGrid = await playerGridAfterRandomise.getAllCellsState()

    await logger.logStep('Verifying that in fact the grid is randomised based on the initial state of cells and the current')
    assert.notDeepEqual(grid, randomisedGrid, 'Ships positions should be on different spots than the initial')
  })

  it('Playing Battleship with the goal to win, should pass if won else test should fail.', async () => {
    let hitStack = []
    let huntMode = true

    await logger.logStep('Opening Battleship page')
    await Browser.openUrl('https://battleship-game.org/en')

    await logger.logStep('Clicking Play button and waiting for player to join')
    await battleshipPage.clickPlayButton()
    opponent = await OpponentGrid.setupOpponentGrid()

    await notificationsForm.waitForYourTurn()
    await battleshipPage.sendMessageToChat('Hello, I am a poorly made bot. If you lose to me you should get good og.')

    while (true) {
      const isYouLoseDisplayed = await notificationsForm.isYouLoseNotifDisplayed()
      const isOpponentLeftDisplayed = await notificationsForm.isOpponentLeftNotifDisplayed()
      const isYouWonDisplayed = await notificationsForm.isYouWonNotifDisplayed()

      if (isYouLoseDisplayed) {
        await failingStep('Lost the game, failed to win', 'Failed to win the game of battleships')

        break
      }
      if (isOpponentLeftDisplayed) {
        await failingStep('Opponent left the match, Test FAIL', 'Test failed automaticaly because the opponent left the lobby')

        break
      }
      if (isYouWonDisplayed) {
        await battleshipPage.sendMessageToChat('gg ez noob')
        await logger.logStep('Successfully won a game of Battleships!')

        break
      }

      await notificationsForm.waitForYourTurn()

      if (huntMode) {
        ;[randomRow, randomCell] = randomCellGenerator.generateUniqueCell()
      } else {
        huntMode = await opponent.destroyShip(hitStack, direction)
      }

      try {
        if (huntMode) {
          cellState = await opponent.getCellState(randomRow, randomCell)

          if (!cellState || !cellState.includes('empty')) {
            continue
          }

          await opponent.selectCellAndClick(randomRow, randomCell)

          cellState = await opponent.getCellState(randomRow, randomCell)

          if (cellState.includes('hit')) {
            hitStack.push([randomRow, randomCell])
            huntMode = false
          } else {
            hitStack = []
            huntMode = true
          }
          if (cellState.includes('done')) {
            hitStack = []
            huntMode = true
          }
        }
      } catch (e) {
        logger.error(`Error clicking on the cell at row ${randomRow}, column ${randomCell}:` + e)
        continue
      }
    }
  })
})
