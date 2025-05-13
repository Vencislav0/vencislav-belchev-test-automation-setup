package framework.utils;

import framework.elements.Label;
import org.openqa.selenium.By;

public class BaseForm {
    protected Label formElement;
    protected String name;
    public BaseForm(By locator, String name){
        this.name = name;
        this.formElement = new Label(locator, name);
    }

    public boolean IsDisplayed(){
        return formElement.IsVisible();
    }
}
