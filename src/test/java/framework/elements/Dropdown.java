package framework.elements;

import framework.utils.LoggerUtil;
import org.openqa.selenium.*;

public class Dropdown extends BaseElement {
    public Dropdown(By locator, String name){
        super(locator, name);
    }


    public void selectByVisibleText(String text) {
        LoggerUtil.debug("Selecting option with text: {} from dropdown: {}", text, name);
        _GetElement().selectOption(text);
    }


    public void selectByIndex(int index) {
        LoggerUtil.debug("Selecting option with index: {} from dropdown: {}", index, name);
        _GetElement().selectOption(index);
    }


    public void selectByValue(String value) {
        LoggerUtil.debug("Selecting option with value: {} from dropdown: {}", value, name);
        _GetElement().selectOptionByValue(value);
    }

    // Get the selected option's text
    public String getSelectedOption() {
        return _GetElement().getSelectedOption().getText();
    }
}