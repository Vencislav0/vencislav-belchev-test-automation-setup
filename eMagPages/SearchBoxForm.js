const Button = require('../framework/Button.js')
const Label = require('../framework/Label.js')
const BaseForm = require('../framework/BaseForm.js')
const TextBox = require('../framework/TextBox.js')

class SearchBoxForm extends BaseForm {
  constructor() {
    super('//div[@class="input-group searchbox-input"]', 'Search Box Form')
    this.searchTextBox = new TextBox('//input[@class="searchbox-main gtm_search_bar_click_search_week js-searchbox-input"]', 'Search TextBox')
    this.searchBoxXButton = new Button('//button[@class="searchbox-close btn btn-default"]', 'Search Box X Button')
    this.searchBoxMagnifierButton = new Button('//button[@class="btn btn-default searchbox-submit-button"]', 'Search Box Magnifier Button')
    this.popularSearchResultsLabel = new Label(
      '//div[@class="searchbox-section searchbox-initial-content searchbox-active"]/p/strong',
      'Popular search results label',
    )
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
