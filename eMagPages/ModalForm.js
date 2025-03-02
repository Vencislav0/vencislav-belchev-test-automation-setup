const Button = require('../framework/Button.js')
const Label = require('../framework/Label.js')
const BaseForm = require('../framework/BaseForm.js')

class ModalForm extends BaseForm {
  constructor() {
    super('//div[@class="modal-dialog modal-lg"]/div[@class="modal-content"]', 'Modal Form')
    this.modalFormTitle = new Label('//span[@class="d-none d-sm-block"]', 'Modal Form Title')
    this.modalFormProductPrice = new Label('//div[@class="row table-layout"]//p[@class="product-new-price"]', 'Product Price')
    this.modalFormProductTitle = new Label('//span[@class="small"]', 'Product Title')
    this.seeCartButton = new Button('//a[@data-test="atc-modal-cart-details" and text()="виж количката"]', 'See Cart Button')
  }

  async getModalFormTitle() {
    return this.modalFormTitle.getText()
  }

  async getProductTitle() {
    return this.modalFormProductTitle.getText()
  }

  async getProductPrice() {
    return this.modalFormProductPrice.getText()
  }

  async clickSeeCartButton() {
    await this.seeCartButton.click()
  }
}
module.exports = ModalForm
