package tests;

import io.qameta.allure.Allure;
import io.qameta.allure.Feature;
import org.testng.annotations.Test;
import pages.login.LoginForm;
import pages.login.LoginPage;
import static org.testng.Assert.*;
import com.codeborne.selenide.*;
import tests.BaseTest;

import java.util.List;

import static com.codeborne.selenide.Selenide.*;

public class LoginPageCredentialsValidationAndPlaceholdersTest extends BaseTest {
    LoginPage loginPage = new LoginPage();
    LoginForm loginForm = new LoginForm();
    @Test
    public void shouldDisplayValidCredentialsAndPlaceholders() {
        open("https://www.saucedemo.com/");
        List<String> usernamesList = loginPage.GetUsernamesList();
        List<String> passwordsList = loginPage.GetPasswordsList();

        Allure.step("placeholders are correct and login button has correct text and color", () -> {
            assertEquals(loginForm.GetUsernamePlaceholder(), "Username", "Username field should have correct placeholder");
            assertEquals(loginForm.GetPasswordPlaceholder(), "Password", "Password field should display correct placeholder");
            assertEquals(loginForm.GetLoginButtonText(), "Login", "Login button should have correct text value");
            assertEquals(loginForm.GetLoginButtonColor(), "#3ddc91", "Login button should have green color");
        });


        Allure.step("Verifying the correct usernames and password data for usage is displayed on the page", () -> {
            assertTrue(usernamesList.contains("standard_user"), "List of usernames should contain standard_user");
            assertTrue(usernamesList.contains("locked_out_user"), "List of usernames should contain locked_out_user");
            assertTrue(usernamesList.contains("problem_user"), "List of usernames should contain problem_user");
            assertTrue(usernamesList.contains("performance_glitch_user"), "List of usernames should contain performance_glitch_user");
            assertTrue(usernamesList.contains("error_user"), "List of usernames should contain error_user");
            assertTrue(usernamesList.contains("visual_user"), "List of usernames should contain visual_user");
            assertTrue(passwordsList.contains("secret_sauce"), "List of password should contain secret_sauce");
        });

    }
}