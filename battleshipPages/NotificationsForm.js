const BaseForm = require('../framework/BaseForm.js')
const Label = require('../framework/Label.js')

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
    const initialTurnVisible = await this.initialTurn.waitForVisible(5000)
    const notifYourTurnVisible = await this.notifYourTurn.waitForVisible(5000)

    return initialTurnVisible || notifYourTurnVisible
  }

  async isPlaceTheShipsDisplayed() {
    return this.notifPlaceTheShips.isDisplayed()
  }

  async getPlaceTheShipsText() {
    return this.notifPlaceTheShips.getText()
  }
}

module.exports = NotificationsForm
