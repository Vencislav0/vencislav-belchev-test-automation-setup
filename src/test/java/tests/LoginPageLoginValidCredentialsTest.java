package tests;

import io.qameta.allure.Allure;
import io.qameta.allure.Feature;
import org.testng.annotations.Test;
import pages.login.LoginForm;
import pages.login.LoginPage;

import static com.codeborne.selenide.Selenide.*;
import static org.testng.Assert.*;
import com.codeborne.selenide.*;
import pages.product.ProductPage;
import tests.BaseTest;

public class LoginPageLoginValidCredentialsTest extends BaseTest {
    LoginPage loginPage = new LoginPage();
    LoginForm loginForm = new LoginForm();
    ProductPage productPage = new ProductPage();
    @Test
    public void shouldLoginWithValidCredentials() {
        open("https://www.saucedemo.com/");

        Allure.step("Typing in valid credentials and submitting form", () -> {
            loginForm.FillUsername("performance_glitch_user");
            loginForm.FillPassword("secret_sauce");
            loginForm.ClickLoginButton();
        });

        Allure.step("Verifying url is product page url and products header is displayed", () -> {
            assertTrue(WebDriverRunner.url().contains("inventory.html"), "url should contain inventory.html after successful navigation");
            assertTrue(productPage.IsHeaderDisplayed(), "Products header should be displayed when landing on the products page");
        });

    }
}