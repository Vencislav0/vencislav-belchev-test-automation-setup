package pages.login;


import framework.elements.Button;
import framework.elements.Label;
import framework.elements.TextBox;
import org.openqa.selenium.By;

import org.openqa.selenium.support.Color;
import framework.utils.BaseForm;

public class LoginForm extends BaseForm {
    private final Button loginButton;
    private final TextBox usernameField;
    private final TextBox passwordField;
    private final Label errorMessage;
    private final Button errorXButton;
    private final Label usernameErrorIcon;
    private final Label passwordErrorIcon;

    public LoginForm(){
        super(By.cssSelector("[class='login-box']"), "Login Form");
        this.loginButton = new Button(By.cssSelector("[data-test='login-button']"), "Login Button");
        this.usernameField = new TextBox(By.cssSelector("#user-name"), "Username Textbox");
        this.usernameErrorIcon = new Label(By.cssSelector("div.form_group #user-name ~ svg"), "Username Error Icon");
        this.passwordErrorIcon = new Label(By.cssSelector("div.form_group #password ~ svg"), "Password Error Icon");
        this.passwordField = new TextBox(By.cssSelector("#password"), "Password Textbox");
        this.errorMessage = new Label(By.xpath("//h3[@data-test='error']"), "Error Message");
        this.errorXButton = new Button(By.xpath("//button[@data-test='error-button']"), "Error X Button");
    }

    //Text fields interaction methods
    public void FillUsername(String text){
        usernameField.SendText(text);
    }

    public void FillPassword(String text){
        passwordField.SendText(text);
    }

    public String GetUsernamePlaceholder(){
        return usernameField.GetPlaceholder();
    }

    public String GetPasswordPlaceholder(){
        return passwordField.GetPlaceholder();
    }

    //Click on elements methods
    public void ClickLoginButton(){
        loginButton.Click();
    }

    public void ClickErrorMessageXButton(){
        errorXButton.Click();
    }

    //Are elements displayed/enabled methods
    public boolean IsUsernameFieldDisplayed(){
        return usernameField.IsVisible();
    }

    public boolean IsPasswordFieldDisplayed(){
        return passwordField.IsVisible();
    }

    public boolean IsLoginButtonDisplayed(){
        return loginButton.IsVisible();
    }

    public boolean IsErrorMessageDisplayed(){
        return errorMessage.IsVisible();
    }

    public boolean IsUsernameErrorIconDisplayed(){
        return usernameErrorIcon.IsVisible();
    }

    public boolean IsPasswordErrorIconDisplayed(){
        return passwordErrorIcon.IsVisible();
    }

    public boolean IsLoginButtonEnabled(){
        return loginButton.IsEnabled();
    }

    //Login button specific actions
    public String GetLoginButtonColor(){
        var color = loginButton.GetCSSValue("background-color");
        return Color.fromString(color).asHex();
    }

    public String GetLoginButtonText(){
        return loginButton.GetAttribute("value");
    }
}


