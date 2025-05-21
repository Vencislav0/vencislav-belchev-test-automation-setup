import { test as base, expect, Page } from '@playwright/test'
import { setLogFile } from './util_functions'
import * as allure from 'allure-js-commons'
import { Status } from 'allure-js-commons'
import logger from './logger'
import fs from 'fs'

const test = base.extend({})

test.beforeAll(async () => {
  logger.initLogger(logger.getLogFile())
})

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('https://www.emag.bg/')  
  await allure.logStep(`test case: ${testInfo.title}`, Status.PASSED)

  setLogFile(`${testInfo.title}.log`, logger)
})

test.afterEach(async ({ page }, testInfo) => {
  if (!fs.existsSync(logger.getLogFile())) return

  const content = fs.readFileSync(logger.getLogFile(), 'utf8')

  if (testInfo.status !== 'passed') {
    await allure.logStep('TEST FAILED', Status.FAILED)
  } else if (testInfo.status === 'passed') {
    await allure.logStep('TEST PASSED', Status.PASSED)
  }
})

export { test, expect }
