package pages.login;

import framework.utils.BaseForm;
import framework.elements.Label;
import org.openqa.selenium.By;

import java.util.Arrays;
import java.util.List;

public class LoginPage extends BaseForm {
    private final Label header;
    private final Label usernamesCredentialsBlock;
    private final Label passwordsCredentialsBlock;

    public LoginPage(){
        super(By.cssSelector("[data-test='login-container']"), "Login Page Container");
        this.header = new Label(By.cssSelector(".login_logo"), "Header Label");
        this.usernamesCredentialsBlock = new Label(By.xpath("//div[@data-test='login-credentials']"), "Usernames Credentials Block");
        this.passwordsCredentialsBlock = new Label(By.xpath("//div[@data-test='login-password']"), "Password Credentials Block");
    }

    //Header action methods
    public boolean IsHeaderDisplayed(){
        return header.IsVisible();
    }

    public String GetHeaderText(){
        return header.GetText();
    }

    //Credentials block methods
    public boolean IsCredentialsBlockDisplayed(){
        return usernamesCredentialsBlock.IsVisible() && passwordsCredentialsBlock.IsVisible();
    }

    public List<String> GetUsernamesList(){
        var namesArray = (usernamesCredentialsBlock.GetText()).split("\n");
        var namesList = Arrays.asList(namesArray);
        return namesList;
    }

    public List<String> GetPasswordsList(){
        var passwordsArray = (passwordsCredentialsBlock.GetText()).split("\n");
        var passwordsList = Arrays.asList(passwordsArray);
        return passwordsList;
    }
}
