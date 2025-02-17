const BaseForm = require('../framework/BaseForm.js')
const Label = require('../framework/Label.js')
const Timeouts = require('../framework/timeouts.js')

class NotificationsForm extends BaseForm {
  constructor() {
    super('//div[@class="notifications"]', 'Notifications Container')

    this.notifPlaceTheShips = new Label('//div[@class="notification notification__init"]/div', '"Place The Ships." notification')
    this.notifWaitingForOpponent = new Label('//div[@class="notification notification__waiting-for-rival"]/div', '"Waiting for opponent" notification')
    this.initialTurn = new Label('//div[@class="notification notification__game-started-move-on"]/div', '"the game started, your turn." notification')
    this.notifYourTurn = new Label('//div[@class="notification notification__move-on"]/div', '"Your Turn." notification')
    this.notifOpponentTurn = new Label('//div[@class="notification notification__move-off"]/div', '"Opponent\'s turn, please wait." notification')
    this.notifOpponentLeft = new Label('//div[@class="notification notification__rival-leave"]/div', '"Your opponent has left the game." notification')
    this.notifYouWon = new Label('//div[@class="notification notification__game-over-win"]/div', '"Game over. Congratulations, you won!" notification')
    this.notifYouLose = new Label('//div[@class="notification notification__game-over-lose"]/div', '"Game over. You lose." notification')
  }

  async isYouLoseNotifDisplayed() {
    return this.notifYouLose.isDisplayed()
  }

  async isInitialTurnNotifDisplayed() {
    const initialTurnVisible = await this.initialTurn.waitForVisible()
    const notifYourTurnVisible = await this.notifYourTurn.waitForVisible()

    return initialTurnVisible || notifYourTurnVisible
  }

  async isPlaceTheShipsDisplayed() {
    return this.notifPlaceTheShips.isDisplayed()
  }

  async getPlaceTheShipsText() {
    return this.notifPlaceTheShips.getText()
  }

  async isYouWonNotifDisplayed() {
    return this.notifYouWon.isDisplayed()
  }

  async isOpponentLeftNotifDisplayed() {
    return this.notifOpponentLeft.isDisplayed()
  }

  async isYourTurnDisplayed() {
    return this.notifYourTurn.isDisplayed()
  }

  async isOpponentTurnDisplayed() {
    return this.notifOpponentTurn.isDisplayed()
  }

  async waitForYourTurn() {
    browser.waitUntil(
      async () => {
        return await this.isInitialTurnNotifDisplayed()
      },
      { timeout: Timeouts.LONG_TIMEOUT, interval: Timeouts.DEFAULT_WAIT_INTERVAL, timeoutMsg: 'Couldnt find a match or switch to your turn' },
    )
  }
}

module.exports = NotificationsForm
