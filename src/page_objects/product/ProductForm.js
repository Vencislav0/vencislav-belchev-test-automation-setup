import { BaseForm } from '../../../framework/elementWrappers/BaseForm'
import { Button } from '../../../framework/elementWrappers/Button'
import { Label } from '../../../framework/elementWrappers/Label'

export class ProductForm extends BaseForm {
  constructor(index) {
    const formLocator = `(//div[@id="card_grid"]//div[@class="card-v2"])[${index}]`
    super(formLocator, 'Product Form Locator')
    this.productPrice = new Label(`${formLocator}//p[@class="product-new-price"][1]`, 'Product Price')
    this.productTitle = new Label(`${formLocator}//h2[@class="card-v2-title-wrapper"]/a`, 'Product Title')
    this.productPriceOpened = new Label(`${formLocator}//p[@class="pricing rrp"]`, 'Product Price Opened Product')
    this.favoriteButton = new Button(`${formLocator}//button[contains(@class, "add-to-favorites btn")]`, 'Product Favorite Button')
  }

  async getPrice(page) {
    return this.productPrice.getText(page)
  }

  async getTitle(page) {
    return this.productTitle.getText(page)
  }

  async getOpenedPrice(page) {
    return this.productPriceOpened.getText(page)
  }

  async clickOnProduct(page) {
    await this.formElement.click(page)
  }

  async clickOnFavoriteButton(page){
    await this.favoriteButton.click(page)
  }

  async getFavoriteButtonState(page){
    return this.favoriteButton.getAttribute(page, 'class')
  }
}
