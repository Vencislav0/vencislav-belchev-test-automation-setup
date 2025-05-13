package framework.elements;

import org.openqa.selenium.*;
import framework.utils.LoggerUtil;

public class Button extends BaseElement {

    public Button(By locator, String name){
        super(locator, name);
    }

    public boolean IsEnabled(){
        LoggerUtil.debug("Checking if {} is enabled", name);
        var isEnabled = _GetElement().isEnabled();
        LoggerUtil.debug("Element {} enabled: {}", name, isEnabled);
        return isEnabled;
    }

}