import { BaseForm } from "../../../framework/elementWrappers/BaseForm"
import { Label } from "../../../framework/elementWrappers/Label"

export class FavoritesPage extends BaseForm { 
    constructor(){
        super('//div[@class="main-container"]', 'Page Main Container Locator')
        this.pageHeader = new Label('//div[contains(@class, "text-nowrap")]', 'Favorites Page Header')
    }

    async getHeaderText(page){
        return this.pageHeader.getText(page)
    }
}