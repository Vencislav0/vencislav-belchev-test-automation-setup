package framework.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggerUtil {

    // A static logger instance for centralized logging
    private static final Logger logger = LoggerFactory.getLogger(LoggerUtil.class);

    // Private constructor to prevent instantiation
    private LoggerUtil() {}

    // Log methods to be used across the framework

    public static void info(String message) {
        logger.info(message);
    }

    public static void info(String message, Object... args) {
        logger.info(message, args);
    }

    public static void debug(String message) {
        logger.debug(message);
    }

    public static void debug(String message, Object... args) {
        logger.debug(message, args);
    }

    public static void warn(String message) {
        logger.warn(message);
    }

    public static void warn(String message, Object... args) {
        logger.warn(message, args);
    }

    public static void error(String message) {
        logger.error(message);
    }

    public static void error(String message, Object... args) {
        logger.error(message, args);
    }

    public static void error(String message, Throwable throwable) {
        logger.error(message, throwable);
    }
}