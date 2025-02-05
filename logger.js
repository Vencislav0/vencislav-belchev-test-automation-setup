const log4js = require('log4js')
const fs = require('fs')
const path = require('path')
const { addAttachment, step } = require('@wdio/allure-reporter').default

const logsDir = path.join(process.cwd(), 'logs')
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true })
}

class Logger {
  constructor() {
    this.logger = null
    this.fileLogger = null
    this.logFileName = ''
    this.initLogger(this.logFileName)
  }

  setLogFile(filePath) {
    if (!filePath) {
      throw new Error('Logger requires a test file path')
    }

    const testFileName = path.basename(filePath, path.extname(filePath))
    this.logFileName = path.join(logsDir, `${testFileName}.log`)

    if (fs.existsSync(this.logFileName)) {
      fs.unlinkSync(this.logFileName)
    }

    fs.writeFileSync(this.logFileName, '', { flag: 'w' })

    this.initLogger(this.logFileName)
  }

  initLogger(testFileName) {
    if (!testFileName) {
      this.logFileName = path.join(logsDir, 'default.log')
    }

    log4js.configure({
      appenders: {
        file: { type: 'file', filename: this.logFileName },
        console: {
          type: 'console',
          layout: {
            type: 'pattern',
            pattern: '%[%d{yyyy-MM-dd hh:mm:ss} [%p] %m %]',
          },
        },
      },
      categories: {
        default: { appenders: ['console', 'file'], level: 'debug' },
        fileLogger: { appenders: ['file'], level: 'trace' },
      },
    })

    this.logger = log4js.getLogger()
    this.fileLogger = log4js.getLogger('fileLogger')
  }

  getLogFile() {
    return this.logFileName
  }

  logStep(stepName) {
    step(stepName, () => {
      this.logger.info(`Step: ${stepName}`)
    })
  }

  trace(message) {
    this.fileLogger.trace(message)
  }

  debug(message) {
    this.logger.debug(message)
  }

  info(message) {
    this.logger.info(message)
  }

  warn(message) {
    this.logger.warn(message)
  }

  error(message) {
    this.logger.error(message)
  }

  fatal(message) {
    this.logger.fatal(message)
  }
}

module.exports = new Logger()
