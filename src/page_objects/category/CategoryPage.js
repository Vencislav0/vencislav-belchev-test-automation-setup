import { BaseForm } from '../../../framework/elementWrappers/BaseForm'
import { Button } from '../../../framework/elementWrappers/Button'
import { Label } from '../../../framework/elementWrappers/Label'

export class CategoryPage extends BaseForm {
  constructor(category) {
    if (!category) {
      throw new Error('Category doesnt exist or not yet implemented')
    }
    super()
    this.sectionTitle = new Label('//h1', 'Section Title')
    this.sectionProductsAmount = new Label('//div[contains(@class, "listing-page-title")]//span', 'Products amount label next to section title')
    this.categoryLabel = new Label(`//li[@data-id="${category.categoryID}"]`, `${category.categoryName} Navigation Locator`)
    this.itemButton = new Button(`//a[@data-id="${category.itemID}"]`, `${category.categoryName} Item Button`)
    this.pageHeader = new Label('(//span[contains(@class, "title-phrasing")])[1]', 'Page Header')
    this.nextPageButton = new Button('//span[text()="Напред"]', 'Navigation Button To Next Page')
  }

  async getFormsCount(page) {
    const productForm = new Label('//div[@id="card_grid"]//div[@class="card-v2"]', 'Locator For Forms Inside Categories')

    return productForm.count(page)
  }

  async hoverOnCategoryLabel(page) {
    await this.categoryLabel.hover(page)
  }

  async clickItemButton(page) {
    await this.itemButton.click(page)
  }

  async getSectionTitle(page) {
    return this.sectionTitle.getText(page)
  }

  async getSectionProductsAmount(page) {
    return this.sectionProductsAmount.getText(page)
  }

  async clickSecondPageButton(page) {
    await this.nextPageButton.click(page)

    await page.waitForURL(new RegExp(`p2`, 'i'))
  }

  async getPageHeader(page){
    return this.pageHeader.getText(page)
  }
}
