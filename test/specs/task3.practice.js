describe('Practicing Element Selectors', () => {
  it('Different type of selectors', async () => {
    await browser.url('https://www.novinite.bg/')
    await browser.maximizeWindow()

    //by ID Attribute (screenshot SS1)
    const logo = await $('#logoMobile')
    //by CSS query selector (screenshot SS2)
    const newsDiv = await $('.top-news-buttons')
    //by name  attribute
    const metaElement = await $('[name="twitter:card"]')
    //by XPath (screenshot SS3)
    const politicsButton = await $('//a[@title="Политика"]')
    //By Link Text (screenshot SS4)
    const societyButton = await $('=Общество')
    //By Partial Link Text (Screenshot SS5)
    const articleElement = await $('*=News')
    //By Tag Name
    const iframe1 = await $('<iframe>')

    //Having trouble with the Partial Link and Link Text options, they seem to be very unreliable and make the tests flaky, they sometimes pass sometimes not.
    //expect(await societyButton.isDisplayed()).toBe(true)
    //expect(await articleElement.isDisplayed()).toBe(true)
    expect(await logo.isDisplayed()).toBe(true)
    expect(await metaElement.isExisting()).toBe(true)
    expect(await newsDiv.isDisplayed()).toBe(true)
    expect(await politicsButton.isDisplayed()).toBe(true)
    expect(await iframe1.isExisting()).toBe(true)
    expect(await iframe1).toHaveAttribute('name', '__tcfapiLocator')
  })
  it('Universal Unique XPath', async () => {
    await browser.url('https://the-internet.herokuapp.com/tables')

    const DueIndex = (await $$('//table[1]//tr[1]//th[span[text()="Due"]]/preceding-sibling::th').length) + 1

    const priceRowElement = await $(`//tr[td[text()="jsmith@gmail.com"]]//td[position()="${DueIndex}"]`)

    browser.waitUntil(async () => await priceRowElement.isDisplayed(), { timeout: 3000 })
    expect(await priceRowElement.isDisplayed()).toBe(true)
    expect(await priceRowElement.getText()).toContain('.00')
  })
})
