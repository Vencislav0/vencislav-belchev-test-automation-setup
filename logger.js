const log4js = require('log4js')
const fs = require('fs')
const path = require('path')
const { addAttachment } = require('@wdio/allure-reporter').default

const logsDir = path.join(process.cwd(), 'logs')
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true })
}

class Logger {
  constructor(){
    this.consoleLogger = null
    this.fileLogger = null
    this.initLogger()   
  }

  initLogger(){
    log4js.configure({
      appenders: {
        file: { type: 'file', filename: path.join(logsDir, 'test.log') },
        console: {
          type: 'console',
          layout: {
            type: 'pattern',
            pattern: '%[%d{yyyy-MM-dd hh:mm:ss} [%p] %m %]',
          },
        },
      },
      categories: {
        default: { appenders: ['console'], level: 'debug' },
        fileLogger: { appenders: ['file'], level: 'trace'}   
      },
          
    })

    this.consoleLogger = log4js.getLogger()
    this.fileLogger = log4js.getLogger('fileLogger')
  }
  
  logStep(stepName) {
    this.consoleLogger.info(`Step: ${stepName}`)
    this.fileLogger.info(`Step: ${stepName}`)
  }

  trace(message) {
    this.fileLogger.trace(message)
  }

  debug(message) {
    this.consoleLogger.debug(message)
    this.fileLogger.debug(message)
  }

  info(message) {
    this.consoleLogger.info(message)
    this.fileLogger.info(message)
  }

  warn(message) {
    this.consoleLogger.warn(message)
    this.fileLogger.warn(message)
  }

  error(message) {
    this.consoleLogger.error(message)
    this.fileLogger.error(message)
  }

  fatal(message) {
    this.consoleLogger.fatal(message)
    this.fileLogger.fatal(message)
  }



}



module.exports = new Logger()
