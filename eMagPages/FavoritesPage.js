const Button = require('../framework/Button.js')
const Label = require('../framework/Label.js')
const BaseForm = require('../framework/BaseForm.js')
const Timeouts = require('../framework/timeouts.js')

class FavoritesPage extends BaseForm {
  constructor() {
    super('//div[@class="page-container"]', 'Favorites Page Container')
    this.pageHeader = new Label('//div[@class="d-flex gap-2 align-items-center overflow-hidden text-nowrap"]', 'Favorites Page Header')
    this.firstProductTitle = new Label('(//div[@id="list-of-favorites"]//a[@data-zone="title"])[1]', 'First Product Title')
    this.secondProductTitle = new Label('(//div[@id="list-of-favorites"]//a[@data-zone="title"])[2]', 'Second Product Title')
    this.firstProductPrice = new Label('(//p[@class="product-new-price"])[1]', 'First Product Price')
    this.secondProductPrice = new Label('(//p[@class="product-new-price"])[2]', 'Second Product Price')
    this.firstProductDeleteButton = new Button('(//span[@class="gtm_9p2y1a d-none d-md-inline-block"])[1]', 'First Product Delete Button')
    this.secondProductDeleteButton = new Button('(//span[@class="gtm_9p2y1a d-none d-md-inline-block"])[2]', 'Second Product Delete Button')
  }

  async getPageHeaderText() {
    return this.pageHeader.getText()
  }

  async getFirstProductTitle() {
    return this.firstProductTitle.getText()
  }

  async getSecondProductTitle() {
    return this.secondProductTitle.getText()
  }

  async isFirstProductDisplayed() {
    return this.firstProductTitle.isDisplayed()
  }

  async isSecondProductDisplayed() {
    return this.secondProductTitle.isDisplayed()
  }

  async getFirstProductPrice() {
    const priceText = await this.firstProductPrice.getText()
    const numericValue = parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'))

    return numericValue
  }

  async getSecondProductPrice() {
    const priceText = await this.secondProductPrice.getText()
    const numericValue = parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'))

    return numericValue
  }

  async clickFirstProductDeleteButton() {
    await this.firstProductDeleteButton.click()
    await browser.waitUntil(
      async () => {
        return (await this.isFirstProductDisplayed()) === false
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Couldnt delete the first product' },
    )
  }

  async clickSecondProductDeleteButton() {
    await this.secondProductDeleteButton.click()
    await browser.waitUntil(
      async () => {
        return (await this.isSecondProductDisplayed()) === false
      },
      { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Couldnt delete the first product' },
    )
  }
}

module.exports = FavoritesPage
