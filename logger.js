const log4js = require('log4js')
const fs = require('fs')
const path = require('path')

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

module.exports = logger
