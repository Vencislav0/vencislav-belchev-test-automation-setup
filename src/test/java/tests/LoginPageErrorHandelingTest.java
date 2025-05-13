package tests;

import io.qameta.allure.Allure;
import io.qameta.allure.Feature;
import org.testng.annotations.Test;
import pages.login.LoginForm;
import pages.login.LoginPage;
import tests.BaseTest;

import static com.codeborne.selenide.Selenide.*;
import static org.testng.Assert.*;


public class LoginPageErrorHandelingTest extends BaseTest {
    LoginPage loginPage = new LoginPage();
    LoginForm loginForm = new LoginForm();

    @Test
    public void shouldDisplayCorrectErrorMessageAndErrorIcons() {
        open("https://www.saucedemo.com/");

        Allure.step("Clicking on login button and verifying error icons and message presence", () -> {
            loginForm.ClickLoginButton();

            assertTrue(loginForm.IsErrorMessageDisplayed(), "Error message should be displayed after clicking the login button");
            assertTrue(loginForm.IsUsernameErrorIconDisplayed(), "Username error icon should be display after clicking login button");
            assertTrue(loginForm.IsPasswordErrorIconDisplayed(), "Password error icon should be displayed after clicking login button");
        });

        Allure.step("Clicking on error message X button and verifying that the error icons and message are gone", () -> {
            loginForm.ClickErrorMessageXButton();
            assertFalse(loginForm.IsErrorMessageDisplayed(), "Error message should be displayed after clicking the login button");
            assertFalse(loginForm.IsUsernameErrorIconDisplayed(), "Username error icon should be display after clicking login button");
            assertFalse(loginForm.IsPasswordErrorIconDisplayed(), "Password error icon should be displayed after clicking login button");
        });

    }
}