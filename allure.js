const log4js = require('log4js')
const fs = require('fs')
const path = require('path')
const { addAttachment, step } = require('@wdio/allure-reporter').default

function attachLogsToAllure(logger) {
  if (!fs.existsSync(logger.getLogFile())) return

  const content = fs.readFileSync(logger.getLogFile(), 'utf8')
  addAttachment(`Test Execution Logs`, content, 'text/plain')
}

module.exports = attachLogsToAllure
