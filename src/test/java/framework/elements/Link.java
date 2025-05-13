package framework.elements;

import org.openqa.selenium.*;

public class Link extends BaseElement {
    public Link(By locator, String name){
        super(locator, name);
    }

    public String getHref(){
        var href = GetAttribute("href");
        return href;
    }
}
