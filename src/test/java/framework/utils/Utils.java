package framework.utils;

import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.Appender;
import ch.qos.logback.core.FileAppender;
import com.codeborne.selenide.Selenide;
import com.codeborne.selenide.WebDriverRunner;
import io.qameta.allure.Allure;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.FluentWait;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;
import java.util.function.BooleanSupplier;

public class Utils {
    public static void takeScreenshot() {
        WebDriver driver = Selenide.webdriver().driver().getWebDriver();
        byte[] screenshot = ((TakesScreenshot) driver).getScreenshotAs(org.openqa.selenium.OutputType.BYTES);

        Allure.attachment("Failure Screenshot", new ByteArrayInputStream(screenshot));
    }
    public static void updateLogFile(String testName) {
        LoggerContext loggerContext = (LoggerContext) LoggerFactory.getILoggerFactory();

        Appender<ILoggingEvent> appender = loggerContext.getLogger("ROOT").getAppender("FILE");

        if (appender instanceof FileAppender) {
            FileAppender<ILoggingEvent> fileAppender = (FileAppender<ILoggingEvent>) appender;

            String logFilePath = "logs/" + testName + ".log";
            fileAppender.setFile(logFilePath);
            fileAppender.start();
        } else {
            LoggerUtil.error("Appender 'FILE' is not a FileAppender!");
        }
    }

    public static void attachLogFile(String testName){
        try {
            Path logFilePath = Paths.get("logs", testName + ".log");
            if (Files.exists(logFilePath)) {
                String content = Files.readString(logFilePath);
                Allure.addAttachment("Test Execution Logs", "text/plain", content, ".log");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void waitUntil(BooleanSupplier condition, int timeoutInSeconds, int pollingMillis, String errorMessage) {
        // Default polling
        WebDriver driver = WebDriverRunner.getWebDriver();

        FluentWait<WebDriver> wait = new FluentWait<>(driver)
                .withTimeout(Duration.ofSeconds(timeoutInSeconds))
                .pollingEvery(Duration.ofMillis(pollingMillis))
                .ignoring(Exception.class);

        try {
            wait.until(d -> condition.getAsBoolean());
        } catch (TimeoutException e) {
            throw new AssertionError(errorMessage, e);
        }
    }

    public static void waitUntil(BooleanSupplier condition, int timeoutInSeconds)
    {
        waitUntil(condition, timeoutInSeconds, 500, "Condition not met within " + timeoutInSeconds + " seconds.");

    }
    public static void waitUntil(BooleanSupplier condition, int timeoutInSeconds, String errorMessage) {
        waitUntil(condition, timeoutInSeconds, 500, errorMessage);
    }
}