package framework.elements;
import com.codeborne.selenide.SelenideElement;
import org.openqa.selenium.By;
import framework.utils.LoggerUtil;

import static com.codeborne.selenide.Selenide.*;

public class BaseElement {
    protected final By locator;
    protected final String name;

    public BaseElement(By locator, String name){
        this.locator = locator;
        this.name = name;
    }

    public SelenideElement _GetElement(){
        return $(locator);
    }

    public void Click(){
        LoggerUtil.debug("Clicking on element: {}", name);
        _GetElement().click();
    }
    public void DoubleClick(){
        LoggerUtil.debug("Double clicking on element: {}", name);
        _GetElement().doubleClick();
    }

    public void Hover(){
        LoggerUtil.debug("Hovering on element: {}", name);
        _GetElement().hover();
    }

    public String GetText(){
        LoggerUtil.debug("Getting Text from element: {}", name);
        var text = _GetElement().getText();
        LoggerUtil.debug("{} Text: {}", name, text);
        return text;
    }

    public Boolean IsVisible(){
        LoggerUtil.debug("Checking visability for element: {}", name);
        var isDisplayed = _GetElement().isDisplayed();
        LoggerUtil.debug("{} Visability: {}", name, isDisplayed);
        return isDisplayed;
    }

    public String GetAttribute(String attribute){
        LoggerUtil.debug("Getting {} attribute from element: {}", attribute, name);
        return _GetElement().getAttribute(attribute);
    }

    public String GetCSSValue(String value){
        LoggerUtil.debug("Getting {} CSS value from element: {}", value, name);
        return _GetElement().getCssValue(value);
    }
}