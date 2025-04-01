const { assert } = require('chai')
const Browser = require('../../framework/Browser.js')
const HomePage = require('../../steam_src/steam_pages/HomePage.js')
const allure = require('@wdio/allure-reporter')
const BrowseSectionFilters = require('../../steam_src/constants/BrowseSectionFilters.js')
const CategoryPage = require('../../steam_src/steam_pages/category/CategoryPage.js')
const BrowseSectionForm = require('../../steam_src/steam_pages/category/browse_section/BrowseSectionForm.js')
const FilterForm = require('../../steam_src/steam_pages/category/browse_section/FilterForm.js')
const StoreCategories = require('../../steam_src/constants/StoreCategories.js')
const Steps = require('../../steam_src/steps/GeneralSteps.js')
const AgeVerificationPage = require('../../steam_src/steam_pages/AgeVerificationPage.js')
const logger = require('../../framework/logger.js')
const GamePage = require('../../steam_src/steam_pages/GamePage.js')
const path = require('path')
const fs = require('fs')
const AboutPage = require('../../steam_src/steam_pages/AboutPage.js')
const BrowseSectionSteps = require('../../steam_src/steps/BrowseSectionSteps.js')

describe('Steam Store e2e', () => {
  const homePage = new HomePage()
  const steps = new Steps()
  const browseSectionSteps = new BrowseSectionSteps()
  const categoryPage = new CategoryPage(StoreCategories.action)
  const topLevelFilterForm = new FilterForm(BrowseSectionFilters.topLevelFilter)
  const browseSectionForm = new BrowseSectionForm()
  const gamePage = new GamePage()
  const aboutPage = new AboutPage()

  it('Should successfully navigate to actions games category and download setup file', async () => {
    await allure.step('Navigating to steam home page', async () => {
      await Browser.windowMaximize()
      await Browser.openUrl('https://store.steampowered.com/')
      await steps.acceptCookiesIfNeeded()
    })

    await allure.step('Navigating to Action category', async () => {
      await homePage.hoverOnCategoryLabel()
      await categoryPage.clickOnCategoryButton()
    })

    await allure.step('Navigate to game filters section and filter by New & Trending', async () => {
      await steps.waitUntilPageLoads()
      //due to lazy loading have to manually scroll to section
      await browser.execute(() => window.scrollBy(0, 1700))
      await topLevelFilterForm.clickOption('New & Trending')
      await browseSectionForm.waitUntilSeeMoreButtonIsDisplayed()
    })

    await allure.step('Clicking "See more" button 5 times', async () => {
      for (let i = 0; i < 5; i++) {
        await browseSectionForm.clickSeeMoreButton()
        await browseSectionForm.waitUntilSeeMoreButtonIsDisplayed()
      }
    })

    logger.logStep('Getting the game with the highest discount or highest price')
    const [gameDiscount, gamePrice] = await browseSectionSteps.selectGameWithHighestDiscountOrPrice()

    await allure.step('Waiting for new page to load', async () => {
      const allHandles = await Browser.getWindowHandles()
      await Browser.switchWindow(allHandles[1])
      await steps.waitUntilPageLoads()
    })

    if ((await Browser.getUrl()).includes('agecheck')) {
      await allure.step('Entering valid age credentials and clicking "View Page" button', async () => {
        const verificationPage = new AgeVerificationPage()
        await verificationPage.selectMonthDay('8')
        await verificationPage.selectMonth('July')
        await verificationPage.selectYear('2000')

        await verificationPage.clickViewPageButton()
        await steps.waitUntilPageLoads()
      })
    }

    await allure.step('Verifying that the price and discount if it has one is the same as in the category page', async () => {
      //Bug caught, on Action genre Action category filtered by New & Trending. Video and screenshot BUGID1 in folder bugs-videos-screenshots
      if (gameDiscount !== 0) {
        const gamePagePriceNumericValue = await steps.getPriceNumericValue(await gamePage.getGamePrice())
        const gamePageDiscountNumericValue = await steps.getDiscountNumericValue(await gamePage.getGameDiscount())

        assert.equal(gamePrice, gamePagePriceNumericValue, 'Price on the game page should be the same as the price on category page')
        assert.equal(gameDiscount, gamePageDiscountNumericValue, 'Discount on the game page should be the same as the discount on category page')
      } else {
        const gamePagePriceWithNoDiscount = await steps.getPriceNumericValue(await gamePage.getGamePriceWithoutDiscount())
        assert.equal(gamePrice, gamePagePriceWithNoDiscount, 'Price on the game page should be the same as the price on category page')
      }
    })

    await allure.step('Downloading steam setup file', async () => {
      await homePage.clickSteamInstallButton()
      const downloadDir = path.resolve(__dirname, '../../downloads')
      const downloadedFilePath = path.join(downloadDir, 'SteamSetup.exe')

      if (!fs.existsSync(downloadDir)) {
        await fs.promises.mkdir(downloadDir, { recursive: true })
      }

      if (fs.existsSync(downloadedFilePath)) {
        fs.unlinkSync(downloadedFilePath)
      }

      await aboutPage.clickInstallSteamButton()

      await steps.waitForDownloadToComplete(downloadedFilePath)

      assert.isTrue(fs.existsSync(downloadedFilePath), 'File should exist after download')
    })
  })
})
