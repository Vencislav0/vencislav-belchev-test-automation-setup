const log4js = require('log4js')
const fs = require('fs')
const path = require('path')
const { addAttachment } = require('@wdio/allure-reporter').default

const logsDir = path.join(process.cwd(), 'logs')
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true })
}

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
    default: { appenders: ['console', 'file'], level: 'trace' },
  },
})

const logger = log4js.getLogger()

function attachLogsToAllure() {
  const logContent = fs.readFileSync(path.join(logsDir, 'test.log'), 'utf8')
  addAttachment('Test Execution Logs', logContent, 'text/plain')

  fs.truncateSync(path.join(logsDir, 'test.log'), 0)
}

module.exports = { logger, attachLogsToAllure }
