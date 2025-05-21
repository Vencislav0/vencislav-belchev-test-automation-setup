import { test, expect } from '../framework/my-setup.js'
import { assert } from 'chai'
import * as allure from 'allure-js-commons'
import steps from '../src/steps/Steps.js'
import { HomePage } from '../src/page_objects/HomePage.js'
import { SocialLinksForm } from '../src/page_objects/SocialLinksForm.js'
import { YoutubeChannelPage } from '../src/YoutubeChannelPage.js'



test.describe('eMAG e2e', () => {
    const socialLinksForm = new SocialLinksForm()
    const homePage = new HomePage()
    const youtubeChannelPage = new YoutubeChannelPage()  
    test('Should correctly redirect to the correct social media links', async ({page, context}) => {
        await allure.step('Verifying page title is as expected', async () => {
        await steps.retryOnPageFailAndCheckTitle(page)
        await homePage.acceptCookiesIfNeeded(page)
        await homePage.dismissAccountLoginIfNeeded(page)
        })

        await allure.step('Clicking Facebook link and verifying correct url on the page, closing it and then verifying browser tabs are 1', async () => {
            const pagePromise = context.waitForEvent('page')

            await socialLinksForm.clickFacebookLink(page)
            const facebookPage = await pagePromise
            await facebookPage.waitForLoadState()

            assert.equal(facebookPage.url(), 'https://www.facebook.com/eMAGbg')
            await facebookPage.close()
            const pages = context.pages()
            assert.equal(pages.length, 1)

        })

        await allure.step('Clicking Instagram link and verifying correct url on the page, closing it and then verifying browser tabs are 1', async () => {
            const pagePromise = context.waitForEvent('page')

            await socialLinksForm.clickInstagramLink(page)
            const instagramPage = await pagePromise
            await instagramPage.waitForLoadState()

            assert.equal(instagramPage.url(), 'https://www.instagram.com/emag.bg_official/')
            await instagramPage.close()
            const pages = context.pages()
            assert.equal(pages.length, 1)

        })

        await allure.step('Clicking Youtube link and verifying correct url on the page, closing it and then verifying browser tabs are 1', async () => {
            const pagePromise = context.waitForEvent('page')

            await socialLinksForm.clickYoutubeLink(page)
            const youtubePage = await pagePromise
            await youtubePage.waitForLoadState()
            await youtubeChannelPage.acceptYoutubeCookiesIfNeeded(youtubePage)

            assert.include(youtubePage.url(), 'https://www.youtube.com/channel/UC5y5r9BY5IiT4MkBrMtZRnA')
            await youtubePage.close()
            const pages = context.pages()
            assert.equal(pages.length, 1)

        })
    })
})