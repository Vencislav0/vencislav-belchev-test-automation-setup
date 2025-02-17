const fs = require('fs')
const path = require('path')
const { addAttachment, step } = require('@wdio/allure-reporter').default
const { logsDir } = require('./logger.js')
const allure = require('@wdio/allure-reporter')

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

  if (fs.existsSync(logFile)) {
    fs.unlinkSync(logFile)
  }

  fs.writeFileSync(logFile, '', { flag: 'w' })

  logger.initLogger(logFile)
}

async function failingStep(message, error) {
  await allure.startStep(message)
  throw new Error(error)
}
module.exports = { attachLogsToAllure, setLogFile, failingStep }
