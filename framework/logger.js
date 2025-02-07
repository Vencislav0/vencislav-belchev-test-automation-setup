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
  }

  initLogger(testFileName) {
    this.logFileName = testFileName || path.join(logsDir, 'default.log')

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

  async logStep(stepName) {
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
module.exports.logsDir = logsDir
