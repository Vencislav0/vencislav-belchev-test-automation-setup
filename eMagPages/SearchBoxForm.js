const Button = require('../framework/Button.js')
const Label = require('../framework/Label.js')
const BaseForm = require('../framework/BaseForm.js')
const TextBox = require('../framework/TextBox.js')
const Timeouts = require('../framework/timeouts.js')

class SearchBoxForm extends BaseForm {
  constructor() {
    super('//div[@class="input-group searchbox-input"]', 'Search Box Form')
    this.searchTextBox = new TextBox('//input[@id="searchboxTrigger"]', 'Search TextBox')
    this.searchBoxXButton = new Button('//button[@type="reset"]', 'Search Box X Button')
    this.searchBoxMagnifierButton = new Button('//button[.//i[@class="em em-search"]]', 'Search Box Magnifier Button')
    this.popularSearchResultsLabel = new Label('//div[@class="searchbox-dropdown-content"]//strong', 'Popular search results label')
  }

  async isPopularSearchResultsLabelDisplayed() {
    return this.popularSearchResultsLabel.isDisplayed()
  }

  async getSearchBoxPlaceHolder() {
    return this.searchTextBox.getAttribute('placeholder')
  }

  async getPopularSearchResultsText() {
    return this.popularSearchResultsLabel.getText()
  }

  async clickOnSearchTextBox() {
    await this.searchTextBox.click()
    await browser.waitUntil(
      async () => {
        return await this.popularSearchResultsLabel.isDisplayed()
      },
      { timeout: Timeouts.DEFAULT_WAIT_INTERVAL, timeoutMsg: 'Couldnt load page after filtering price' },
    )
  }

  async isSearchboxXButtonDisplayed() {
    return this.searchBoxXButton.isDisplayed()
  }

  async isSearchBoxMagnifierButtonDisplayed() {
    return this.searchBoxMagnifierButton.isDisplayed()
  }

  async sendTextToTextBox(text) {
    await this.searchTextBox.sendText(text)
  }

  async getTextInsideSearchBox() {
    return this.searchTextBox.getValue()
  }

  async clickXButton() {
    await this.searchBoxXButton.click()
  }

  async clickMagnifierButton() {
    await this.searchBoxMagnifierButton.click()
  }
}

module.exports = SearchBoxForm
