const Button = require('../framework/Button.js')
const Label = require('../framework/Label.js')
const BaseForm = require('../framework/BaseForm.js')
const Dropdown = require('../framework/Dropdown.js')
const TextBox = require('../framework/TextBox.js')
const CheckBox = require('../framework/Checkbox.js')
const Timeouts = require('../framework/timeouts.js')

class ProductForm extends BaseForm{
    constructor(){
        super('//div[@id="card_grid"]//div[@class="card-v2-wrapper js-section-wrapper"]', 'Product Form')
        this.productPrice  
        this.productTitle
    }

    async getProductTitle(index){
        this.productTitle = new Label(`(//div[@id="card_grid"]//h2[@class="card-v2-title-wrapper"]/a)[${index}]`)

        return this.productTitle.getText()
    }

    async getProductPrice(index){
    this.productPrice = new Label(`(//div[@id="card_grid"]//p[@class="product-new-price"])[${index}]`, 'Product Price')
    const priceText = await this.productPrice.getText()
    const numericValue = parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'))

    return numericValue
    }

    async isValidProduct(index){
        try{
        let productTitle = new Label(`(//div[@id="card_grid"]//h2[@class="card-v2-title-wrapper"]/a)[${index}]`, 'Product Title')
        let productPrice = new Label(`(//div[@id="card_grid"]//p[@class="product-new-price"])[${index}]`, 'Product Price')
        return (await productTitle.isDisplayed()) && (await productPrice.isDisplayed())

        }
        catch(er){
            return false
        }        
    }
}

module.exports = ProductForm