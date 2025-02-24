const Button = require('../framework/Button.js')
const Label = require('../framework/Label.js')
const BaseForm = require('../framework/BaseForm.js')

class ModalForm extends BaseForm {
  constructor() {
    super('//div[@class="modal-dialog modal-lg"]/div[@class="modal-content"]', 'Modal Form')
    this.modalFormTitle = new Label('//span[@class="d-none d-sm-block"]', 'Modal Form Title')
    this.modalFormProductPrice = new Label('//div[@class="table-cell col-xs-4 col-sm-4 text-end"]/p[@class="product-new-price"]', 'Product Price')
    this.modalFormProductTitle = new Label('//span[@class="small"]', 'Product Title')
    this.seeCartButton = new Button('//a[@class="btn btn-primary btn-sm btn-block"]', 'See Cart Button')
  }

  async getModalFormTitle() {
    return this.modalFormTitle.getText()
  }

  async getModalFormProductTitle() {
    return this.modalFormProductTitle.getText()
  }

  async getModalFormProductPrice() {
    const priceText = await this.modalFormProductPrice.getText()
    const numericValue = parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'))

    return numericValue
  }

  async clickSeeCartButton() {
    await this.seeCartButton.click()
  }
}
module.exports = ModalForm
