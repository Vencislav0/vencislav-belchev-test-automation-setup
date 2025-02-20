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
    this.currenctNotifPresent = new Label(
      '//div[@class="notifications"]/div[contains(@class, "notification") and not(contains(@class, "none"))]',
      'Current notification present on screen',
    )
  }

  async getNotificationText() {
    return this.currenctNotifPresent.getText()
  }

  async isYouLoseNotifDisplayed() {
    return this.notifYouLose.isDisplayed()
  }

  async isInitialTurnNotifDisplayed() {
    return this.initialTurn.isDisplayed()
  }

  async isYourTurnDisplayed() {
    return this.notifYourTurn.isDisplayed()
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

  async isOpponentTurnDisplayed() {
    return this.notifOpponentTurn.isDisplayed()
  }

  async waitForYourTurnOrEndOfGame() {
    await browser.waitUntil(
      async () => {
        return (
          (await this.isYourTurnDisplayed()) ||
          (await this.isInitialTurnNotifDisplayed()) ||
          (await this.isYouLoseNotifDisplayed()) ||
          (await this.isOpponentLeftNotifDisplayed()) ||
          (await this.isYouWonNotifDisplayed())
        )
      },
      { timeout: Timeouts.LONG_TIMEOUT, interval: Timeouts.DEFAULT_WAIT_INTERVAL, timeoutMsg: 'Couldnt find a match or switch to your turn' },
    )
  }
}

module.exports = NotificationsForm
