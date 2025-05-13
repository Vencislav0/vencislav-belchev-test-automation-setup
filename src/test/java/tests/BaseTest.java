package tests;

import com.codeborne.selenide.Configuration;
import io.qameta.allure.Feature;
import org.slf4j.MDC;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import framework.utils.LoggerUtil;
import org.testng.annotations.Listeners;
import io.qameta.allure.Allure;

import java.lang.reflect.Method;

import static framework.utils.Utils.*;


@Listeners({io.qameta.allure.testng.AllureTestNg.class})
public class BaseTest {


    @BeforeMethod
    public void setUp(Method method) {
        var testName = method.getName();
        MDC.put("current.test.name", testName);

        updateLogFile(testName);

        LoggerUtil.info("==== STARTING TEST: {} ====", testName);
        Configuration.browser = "chrome";
        Configuration.browserSize = "1920x1080";
    }

    @AfterMethod
    public void tearDown(ITestResult result) {
        String testName = result.getMethod().getMethodName();
        attachLogFile(testName);
        if(result.getStatus() == ITestResult.FAILURE){
            takeScreenshot();
        }
        LoggerUtil.info("==== FINISHED TEST: {} ====", testName);
        MDC.clear();
        com.codeborne.selenide.Selenide.closeWebDriver();

    }

}