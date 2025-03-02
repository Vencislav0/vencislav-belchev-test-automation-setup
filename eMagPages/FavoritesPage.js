const Label = require('../framework/Label.js')
const BaseForm = require('../framework/BaseForm.js')

class FavoritesPage extends BaseForm {
  constructor() {
    super('//div[@class="page-container"]', 'Favorites Page Container')
    this.pageHeader = new Label('//div[@class="d-flex gap-2 align-items-center overflow-hidden text-nowrap"]', 'Favorites Page Header')
  }

  async getPageHeaderText() {
    return this.pageHeader.getText()
  }
}

module.exports = FavoritesPage
