const fs = require('fs')
const path = require('path')
const { addAttachment } = require('@wdio/allure-reporter').default
const { logsDir } = require('./logger.js')
const allure = require('@wdio/allure-reporter')
const { assert } = require('chai')

function attachLogsToAllure(logger) {
  if (!fs.existsSync(logger.getLogFile())) return

  const content = fs.readFileSync(logger.getLogFile(), 'utf8')
  addAttachment(`Test Execution Logs`, content, 'text/plain')
}

function setLogFile(filePath, logger) {
  if (!filePath) {
    throw new Error('Logger requires a test file path')
  }

  const testFileName = path.basename(filePath, path.extname(filePath))
  const logFile = path.join(logsDir, `${testFileName}.log`)
  const defaultlogFile = path.join(logsDir, `default.log`)

  if (fs.existsSync(logFile)) {
    fs.unlinkSync(logFile)
  }
  if (fs.existsSync(defaultlogFile)) {
    fs.unlinkSync(defaultlogFile)
  }

  fs.writeFileSync(logFile, '', { flag: 'w' })

  logger.initLogger(logFile)
}

async function failingStep() {
  allure.startStep('Test FAILED')
  allure.endStep('failed')
}
module.exports = { attachLogsToAllure, setLogFile, failingStep }
