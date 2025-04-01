const BaseForm = require('../../../../framework/BaseForm.js')
const Label = require('../../../../framework/Label.js')
const Button = require('../../../../framework/Button.js')
const Timeouts = require('../../../../framework/timeouts.js')

class BrowseSectionForm extends BaseForm {
  constructor() {
    const browseSectionLocator = '//div[@class="_3vjDu6zylspBzUE7FmM6Yl"]'
    super(browseSectionLocator, 'Browse Section Locator')
    this.seeMoreButton = new Button(`${browseSectionLocator}//button[text()="Show more"]`, 'See More Button')
  }

  async clickSeeMoreButton() {
    await this.seeMoreButton.click()
  }

  async getGamesCount() {
    const gamesArray = await new Label('//div[@class="gASJ2lL_xmVNuZkWGvrWg"]', 'Games Locator')._getElements()

    return gamesArray.length
  }

  async waitUntilSeeMoreButtonIsDisplayed() {
    await browser.waitUntil(
      async () => {
        return await this.seeMoreButton.isDisplayed()
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: "See More Button wasn't displayed on time" },
    )
  }
}

module.exports = BrowseSectionForm
