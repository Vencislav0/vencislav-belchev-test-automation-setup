import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { logsDir } from './logger.js'
import { test } from '@playwright/test'

export function setLogFile(filePath, logger) {
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

export async function waitUntil(
  fn: () => Promise<boolean>,
  { errorMessage = 'waitUntil timeout exceeded', timeout = 5000, interval = 100 }: { errorMessage?: string; timeout?: number; interval?: number } = {},
) {
  const start = Date.now()
  while (true) {
    if (await fn()) return

    if (Date.now() - start > timeout) {
      throw new Error(errorMessage || 'waitUntil timeout exceeded')
    }

    await new Promise((res) => setTimeout(res, interval))
  }
}
