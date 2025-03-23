const Label = require('../../../framework/elementWrappers/Label.js')
const BaseForm = require('../../../framework/BaseForm.js')

class FavoritesPage extends BaseForm {
  constructor() {
    super('//div[contains(@class, "js-lists-container")]', 'Favorited Products Container Locator')
    this.pageHeader = new Label('//div[contains(@class, "text-nowrap")]', 'Favorites Page Header')
  }

  async getPageHeaderText() {
    return this.pageHeader.getText()
  }
}

module.exports = FavoritesPage
