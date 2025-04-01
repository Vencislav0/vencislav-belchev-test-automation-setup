const BaseForm = require('../../../framework/BaseForm.js')
const Button = require('../../../framework/Button.js')

class CategoryPage extends BaseForm {
  constructor(category) {
    if (!category) {
      throw new Error('category not found or still not implemented')
    }
    super('//div[@class="responsive_page_content"]', `${category.name} Category Content Locator`)
    this.categoryButton = new Button(
      `//div[@data-genre-group='${category.genre}']/a[normalize-space(text()) = "${category.name}"]`,
      `${category.name} Navigation Button`,
    )
  }

  async clickOnCategoryButton() {
    await this.categoryButton.click()
  }
}

module.exports = CategoryPage
