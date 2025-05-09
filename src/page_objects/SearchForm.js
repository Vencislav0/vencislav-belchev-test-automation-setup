import { BaseForm } from "../../framework/elementWrappers/BaseForm";
import { Button } from "../../framework/elementWrappers/Button";
import { Label } from "../../framework/elementWrappers/Label";
import { TextBox } from "../../framework/elementWrappers/TextBox";

export class SearchForm extends BaseForm{
    constructor(){
        const formLocator = '//form[@action="/search"]'
        super(formLocator, 'Search from locator') 
        this.searchTextBox = new TextBox('//input[@id="searchboxTrigger"]', 'Search Text Box')
        this.magnifierButton = new Button('//button[contains(@class, "searchbox-submit-button")]', 'Magnifier Button')
        this.crossXButton = new Button('//button[contains(@class, "searchbox-close")]', '(X) Button')
        this.searchParagraph = new Label(`${formLocator}//p`, 'Search Placeholder Text')
    }

    async isSearchPlaceholderDisplayed(page){
        return this.searchParagraph.isVisible(page)
    }

    async getSearchParagraphText(page){
        return this.searchParagraph.getText(page)
    }

    async isMagnifierButtonDisplayed(page){
        return this.magnifierButton.isVisible(page)
    }

    async isCrossXButtonDisplayed(page){
        return this.crossXButton.isVisible(page)
    }

    async getSearchTextBoxPlaceholder(page){
        return this.searchTextBox.getAttribute(page, 'placeholder')
    }

    async sendTextToSearchbox(page, text){
        await this.searchTextBox.type(page, text)
    }

    async getSeachboxText(page){
        return this.searchTextBox.getText(page)
    }

    async clickMagnifierButton(page){
        await this.magnifierButton.click(page)
    }

    async clickOnSearchbox(page){
        await this.searchTextBox.click(page)
    }

    async clickCrossXButton(page){
        await this.crossXButton.click(page)
    }




}