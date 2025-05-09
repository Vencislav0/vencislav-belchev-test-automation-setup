import { test, expect } from '../framework/my-setup.js'
import { assert } from 'chai'
import * as allure from 'allure-js-commons'
import steps from '../src/steps/Steps.js'
import { SearchForm } from '../src/page_objects/SearchForm.js'
import { CategoryPage } from '../src/page_objects/category/CategoryPage.js'
import { Categories } from '../src/constants/Categories.js'
import { SortDropdownForm } from '../src/page_objects/category/SortDropdownForm.js'
import { ProductForm } from '../src/page_objects/product/ProductForm.js'
import { HomePage } from '../src/page_objects/HomePage.js'
import { FavoritesProductForm } from '../src/page_objects/favorites/FavoritesProductForm.js'
import { FavoritesPage } from '../src/page_objects/favorites/FavoritesPage.js'

test.describe('eMAG e2e', () => {
    const searchForm = new SearchForm()
    const dronesPage = new CategoryPage(Categories.drones)
    const sortForm = new SortDropdownForm()
    const homePage = new HomePage()
    const favoritesPage = new FavoritesPage()
    test('Should correctly search and display expected elements, should correctly favorite products and add them to favorites page then delete them', async ({page}) => {
        await allure.step('Verifying page title is as expected', async () => {
              assert.include(await page.title(), 'Широка гама продукти', 'page title should be eMAG.bg  - Широка гама продукти')
        })

        await allure.step('Clicking on search box and verifying expected elements and placeholder are displayed', async () => {
            await searchForm.clickOnSearchbox(page)

            assert.isTrue(await searchForm.isMagnifierButtonDisplayed(page), 'Magnifier button should be displayed')
            assert.isTrue(await searchForm.isCrossXButtonDisplayed(page), '(X) Button should be displayed after clicking on search box')
            assert.equal(await searchForm.getSearchTextBoxPlaceholder(page), 'Какво търсиш днес?', 'Search box should have placeholder "Какво търсиш днес?"')
            assert.isTrue(await searchForm.isSearchPlaceholderDisplayed(page), 'Search paragraph should be displayed')
            assert.equal((await searchForm.getSearchParagraphText(page)).trim(), 'Популярни търсения в eMAG', 'Search paragraph should have text "Популярни търсения в eMAG"')

        })

        await allure.step('Typing in "dji mini 4 pro" searching then verifying the section title structure', async () => {
            await searchForm.sendTextToSearchbox(page, 'dji mini 4 pro')
            await searchForm.clickMagnifierButton(page)
            await steps.waitForURLToChange(page)            
 
            const header = await dronesPage.getPageHeader(page)
            const patternToFollow = /^\d+\s+резултата\s+.+\s+за\s+"[^"]+"$/

            assert.match(header.trim(), patternToFollow, `Header structure should follow this pattern "some_numbers резултата some_text за “search_string”" instead it was ${header}`)
        })

        await allure.step('Sorting by popularity, favouriting the first two products, verifying favorite buttons states and menu favorites item has the number 2', async () => {
            await sortForm.sortItemsByPopularity(page)
            const firstProduct = new ProductForm(1)
            const secondProduct = new ProductForm(2)
            await firstProduct.clickOnFavoriteButton(page)
            assert.include(await firstProduct.getFavoriteButtonState(page), 'active', 'first product should include active after adding to favorites')
            await secondProduct.clickOnFavoriteButton(page)
            assert.include(await secondProduct.getFavoriteButtonState(page), 'active', 'second product should include active after adding to favorites')

            await steps.waitUntilHeartIconIs2(page)
            assert.equal(await homePage.getNumberOnHeartIcon(page), '2', 'Heart Icon number should be 2 after adding two products')
        })

        await allure.step('Clicking on Favorites Menu Item, verifying the 2 previous products are added with correct details, deleting them and verifying deletion', async () => {
            //storing title and price of the products on the page
            const firstProductTitle = await (new ProductForm(1)).getTitle(page)
            const firstProductPrice = await steps.getProductNumericValue(await (new ProductForm(1)).getPrice(page))

            const secondProductTitle = await (new ProductForm(2)).getTitle(page)
            const secondProductPrice = await steps.getProductNumericValue(await (new ProductForm(2)).getPrice(page))

            await homePage.clickFavoritesMenuItem(page)
            await steps.waitForURLToChange(page)
            //storing title and price of the products on the favorites page after navigation
            const firstFavoriteProductTitle = await (new FavoritesProductForm(1)).getTitle(page)
            const firstFavoriteProductPrice = await steps.getProductNumericValue(await (new FavoritesProductForm(1)).getPrice(page))

            const secondFavoriteProductTitle = await (new FavoritesProductForm(2)).getTitle(page)
            const secondFavoriteProductPrice = await steps.getProductNumericValue(await (new FavoritesProductForm(2)).getPrice(page))

            assert.isTrue((firstProductTitle.trim() === firstFavoriteProductTitle.trim()) || (firstProductTitle.trim() === secondFavoriteProductTitle.trim()), 'product title should be the same as the drones page product title')
            assert.isTrue((secondProductTitle.trim() === secondFavoriteProductTitle.trim()) || (secondProductTitle.trim() === firstFavoriteProductTitle.trim()), 'product title should be the same as the drones page product title')

            assert.isTrue((firstProductPrice === firstFavoriteProductPrice) || (firstProductPrice === secondFavoriteProductPrice), `First product price ${firstProductPrice} should match either the first favorite product price ${firstFavoriteProductPrice} or the second favorite product price ${secondFavoriteProductPrice}, but it did not.`)
            assert.isTrue((secondProductPrice === secondFavoriteProductPrice) || (secondProductPrice === firstFavoriteProductPrice), `Second product price ${secondProductPrice} should match either the first favorite product price ${firstFavoriteProductPrice} or the second favorite product price ${secondFavoriteProductPrice}, but it did not.`)
           
        })

        await allure.step('Deleting products 1 by 1 and verifying deletion each time', async () => {
            let pageHeaderText = await favoritesPage.getHeaderText(page)
            assert.equal(pageHeaderText.trim(), 'Любими2 Продукта', 'Shpuld have 2 products before deletion')
            const firstProduct = new FavoritesProductForm(1)
            const secondProduct = new FavoritesProductForm(2)

            await secondProduct.clickDeleteButton(page)
            await steps.waitUntilValueChange(pageHeaderText, async () => await favoritesPage.getHeaderText(page))
            pageHeaderText = await favoritesPage.getHeaderText(page)
            assert.equal(pageHeaderText.trim(), 'Любими1 продукт', 'Should have 1 product after deletion of the second product')

            await firstProduct.clickDeleteButton(page)
            await steps.waitUntilValueChange(pageHeaderText, async () => await favoritesPage.getHeaderText(page))
            pageHeaderText = await favoritesPage.getHeaderText(page)
            assert.equal(pageHeaderText.trim(), 'Любими0 Продукта', 'Should have 0 products after deletion of the last product')
        })
    })
})