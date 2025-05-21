import { BaseForm } from "../../../framework/elementWrappers/BaseForm";
import { Button } from "../../../framework/elementWrappers/Button";
import { Label } from "../../../framework/elementWrappers/Label";

export class FavoritesProductForm extends BaseForm{
    constructor(index = 1){
        const formLocator = `(//div[contains(@class, "card-favorites-wrapper")])[${index}]`
        super(formLocator, 'Form Locator')
        this.productTitle = new Label(`${formLocator}//a[@data-zone="title"]`, 'Favorites Product Title')
        this.productPrice = new Label(`${formLocator}//p[@class="product-new-price"][1]`, 'Favorites Product Price')
        this.productDeleteButton = new Button(`${formLocator}//span[text()="Изтрий"]`, 'Favorites Product Delete Button')
    }

    async getTitle(page){
        return this.productTitle.getText(page)
    }

    async getPrice(page){
        return this.productPrice.getText(page)
    }

    async clickDeleteButton(page){
        await this.productDeleteButton.click(page)
    }
}