package framework.elements;

import framework.utils.LoggerUtil;
import org.openqa.selenium.*;

public class TextBox extends BaseElement {
    public TextBox(By locator, String name){
        super(locator, name);
    }

    public void SendText(String text){
        LoggerUtil.debug("Sending text \"{}\" to element: {}", text, name);
        _GetElement().setValue(text);
    }

    public void CLear(){
        LoggerUtil.debug("Clearing text field: {}", name);
        _GetElement().clear();
    }

    public String GetPlaceholder(){
        var placeholder =  GetAttribute("placeholder");
        return placeholder;
    }
}
