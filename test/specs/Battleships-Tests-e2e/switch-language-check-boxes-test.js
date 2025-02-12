const { assert } = require('chai')
const browser = require('../../../framework/Browser.js')
const logger = require('../../../framework/logger.js')
const BattleShipPage = require('../../../battleshipPages/BattleshipPage.js')
const NotificationsForm = require('../../../battleshipPages/NotificationsForm.js')

describe('Battle Ships Tests e2e', () => {
  const battleshipPage = new BattleShipPage()
  const notificationsPage = new NotificationsForm()

  it('Should switch to english language when english option is selected, certain checkboxes should be checked', async () => {
    await logger.logStep('Opening Battleship page')
    await browser.openUrl('https://battleship-game.org/zh')

    logger.logStep('Accepting data consent if needed')
    await battleshipPage.clickConsentButtonIfDisplayed()

    await logger.logStep('Veryfing that a element on the page has text in Mandarin before switching to english')
    assert.equal(await notificationsPage.getPlaceTheShipsText(), '安排', 'should have Mandarin text before switching to english')

    await logger.logStep('Switching to English version')
    await battleshipPage.switchLanguageToEnglish()

    await logger.logStep('Verifying that version changed based on the url')
    assert.equal(await browser.getUrl(), 'https://battleship-game.org/en/', 'Url should be correct after version change')

    await logger.logStep('Verifying that the same element is now in English')
    assert.equal(await notificationsPage.getPlaceTheShipsText(), 'Place the ships.', 'should have english text after switching to english version')

    await logger.logStep('Veryfing that Mark verified empty cells checkbox is checked')
    assert.isTrue(await battleshipPage.isMarkVerifiedEmptyCellsChecked(), 'mark verified empty cells should be checked initialy.')

    await logger.logStep('Checking combact chat checkbox')
    await battleshipPage.checkCompactChat()

    await logger.logStep('Verifying that combact chat checkbox is checked')
    assert.isTrue(await battleshipPage.isCompactChatChecked())
  })
})
