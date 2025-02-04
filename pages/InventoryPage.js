const BaseElement = require('../framework/BaseElement.js')
const logger = require('../logger.js')
const BaseForm = require('../framework/BaseForm.js')
const TextBox = require('../framework/TextBox.js')
const Button = require('../framework/Button.js')

class inventoryPage extends BaseForm{
    constructor(){
        super('//div[@data-test="inventory-container"]', 'Inventory Container')
        this.productsElement = new BaseElement('//span[@data-test="title"]', 'Products Element')
    }

    async isProductsElementDisplayed(){
        return this.productsElement.isDisplayed()
    }
    async getProductsElementText(){
        return this.productsElement.getText()
    }
}

module.exports = inventoryPage