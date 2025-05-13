package pages.product;

import framework.utils.BaseForm;
import framework.elements.Label;
import org.openqa.selenium.By;

public class ProductPage extends BaseForm {
    private final Label header;

    public ProductPage(){
        super(By.cssSelector("#page_wrapper"), "Products Page Container");
        this.header = new Label(By.cssSelector("[data-test='title']"), "Header Title");
    }

    public boolean IsHeaderDisplayed(){
        return header.IsVisible();
    }
}
