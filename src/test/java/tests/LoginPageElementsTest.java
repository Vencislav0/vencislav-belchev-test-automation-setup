package tests;

import io.qameta.allure.Allure;
import io.qameta.allure.Feature;
import pages.login.LoginForm;
import pages.login.LoginPage;
import org.testng.annotations.Test;
import tests.BaseTest;

import static org.testng.Assert.*;
import static com.codeborne.selenide.Selenide.*;

public class LoginPageElementsTest extends BaseTest {
    LoginPage loginPage = new LoginPage();
    LoginForm loginForm = new LoginForm();
    @Test
    public void shouldDisplayAllElements() {
        open("https://www.saucedemo.com/");

        Allure.step("Verify all elements are visible", () -> {
            assertTrue(loginPage.IsHeaderDisplayed(), "Header should be displayed on the page");
            assertEquals(loginPage.GetHeaderText(), "Swag Labs", "Header text should be Swag Labs");
            assertTrue(loginForm.IsUsernameFieldDisplayed(), "Username field should be displayed on the page");
            assertTrue(loginForm.IsPasswordFieldDisplayed(), "Password field should be displayed on the page");
            assertTrue(loginForm.IsLoginButtonDisplayed(), "Login button should be displayed on the page");
            assertTrue(loginForm.IsLoginButtonEnabled(), "Login button should be enabled and interactable");
            assertTrue(loginPage.IsCredentialsBlockDisplayed(), "Credentials block should be displayed on the page");
        });

    }
}
