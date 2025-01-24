const { assert } = require('chai')

describe('Add/Remove Elements e2e', () => {
  it('should add and remove elements when clicking the buttons', async () => {
    browser.url('https://the-internet.herokuapp.com/add_remove_elements/')

    const addElementButton = await $('//button[text()="Add Element"]')
    let deleteButton = await $('//button[text()="Delete"]')

    assert.isTrue(await addElementButton.isDisplayed(), 'Add button should be displayed')
    assert.isFalse(await deleteButton.isDisplayed(), 'Delete button should not be displayed until the add button is clicked')
    assert.equal(await $('h3').getText(), 'Add/Remove Elements', 'the header should display Add/Remove Elements')

    for (i = 0; i < 10; i++) {
      await addElementButton.click()
    }

    deleteButton = await $$('//button[text()="Delete"]')

    assert.equal(deleteButton.length, 10, 'Delete buttons should be 10 after clicking add element 10 times')

    for (i = 10; i > 0; i--) {
      const lastDeleteButton = deleteButton[deleteButton.length - 1]
      await lastDeleteButton.click()

      deleteButton = await $$('//button[text()="Delete"]')
      assert.equal(deleteButton.length, i - 1, 'Delete button should be removed when clicked')
    }

    assert.isFalse(await $('//button[text()="Delete"]').isDisplayed(), 'No delete buttons should be left after clicking all of them')
  })
})

describe('JavaScript Alerts e2e', () => {
  it('Confirming functionality of all alerts displayed', async () => {
    browser.url('https://the-internet.herokuapp.com/javascript_alerts')

    const clickForAlert = await $('//button[text()="Click for JS Alert"]')
    const clickForAlertConfirm = await $('//button[text()="Click for JS Confirm"]')
    const clickForAlertPrompt = await $('//button[text()="Click for JS Prompt"]')

    assert.equal(
      await $('//p[1]').getText(),
      'Here are some examples of different JavaScript alerts which can be troublesome for automation',
      '"Here are some examples of different JavaScript alerts which can be troublesome for automation" should be displayed on the page',
    )

    assert.isTrue(await clickForAlert.isDisplayed(), 'Click for alert button should be visible')
    assert.isTrue(await clickForAlertConfirm.isDisplayed(), 'Click for alert confirm button should be visible')
    assert.isTrue(await clickForAlertPrompt.isDisplayed(), 'Click for alert prompt button should be visible')
    assert.equal(await $('h3').getText(), 'JavaScript Alerts', 'Header should be displayed with text JavaScript Alerts')

    await browser.pause(2000)
    //First alert accept case
    await clickForAlert.click()
    assert.equal(await browser.getAlertText(), 'I am a JS Alert', 'alert text should equal "I am a JS Alert"')
    await browser.acceptAlert()

    assert.equal(
      await $('//p[@id="result"]').getText(),
      'You successfully clicked an alert',
      '"You successfully clicked an alert" should be displayed after accepting the alert',
    )

    //Second alert dismiss case
    await clickForAlertConfirm.click()
    assert.equal(await browser.getAlertText(), 'I am a JS Confirm', 'alert text should equal "I am a JS Confirm"')
    await browser.dismissAlert()

    assert.equal(await $('//p[@id="result"]').getText(), 'You clicked: Cancel', '"You clicked: Cancel" should be displayed after accepting the alert')

    //Third alert prompt case
    await clickForAlertPrompt.click()
    assert.equal(await browser.getAlertText(), 'I am a JS prompt', 'alert text should equal "I am a JS prompt"')
    await browser.sendAlertText('test')
    await browser.acceptAlert()

    assert.equal(await $('//p[@id="result"]').getText(), 'You entered: test', '"You entered: test" should be displayed after accepting the alert')
  })
})

describe('Checkboxes e2e', () => {
  it('Confirming functionality of all checkboxes displayed', async () => {
    browser.url('https://the-internet.herokuapp.com/checkboxes')

    const checkboxes = await $$('//input[@type="checkbox"]')

    assert.equal(await $('h3').getText(), 'Checkboxes', 'Header with "Checkboxes" text should be displayed')
    assert.isTrue(await checkboxes[0].isDisplayed(), 'First checkbox should be displayed')
    assert.isTrue(await checkboxes[1].isDisplayed(), 'Second checkbox should be displayed')

    assert.isFalse(await checkboxes[0].isSelected(), 'First checkbox should not be checked')
    assert.isTrue(await checkboxes[1].isSelected(), 'Second checkbox should be checked')

    await checkboxes[0].click()
    assert.isTrue(await checkboxes[0].isSelected(), 'First checkbox should be checked')

    await checkboxes[0].click()
    assert.isFalse(await checkboxes[0].isSelected(), 'First checkbox should not be checked')

    await checkboxes[1].click()
    assert.isFalse(await checkboxes[0].isSelected(), 'First checkbox should not be checked')
    assert.isFalse(await checkboxes[1].isSelected(), 'Second checkbox should not be checked')
  })
})

describe('Hovers e2e', () => {
  it('Confirming functionality of Hovers', async () => {
    browser.url('https://the-internet.herokuapp.com/hovers')

    const images = await $$('//div[@class="figure"]')
    const names = await $$('//h5')
    const viewProfileButton = await $$('//a[text()="View profile"]')

    assert.equal(await $('h3').getText(), 'Hovers', 'Header with "Hovers" text should be displayed')
    assert.equal(
      await $('//p[1]').getText(),
      'Hover over the image for additional information',
      '"Hover over the image for additional information" should be displayed on the page',
    )
    assert.isTrue(await images[0].isDisplayed(), 'First image should be displayed')
    assert.isTrue(await images[1].isDisplayed(), 'Second image should be displayed')
    assert.isTrue(await images[2].isDisplayed(), 'Third image should be displayed')

    await images[0].moveTo()
    assert.isTrue(await names[0].isDisplayed(), 'First name should be displayed when the first image is hovered on')
    assert.isTrue(await viewProfileButton[0].isDisplayed(), 'First "View Profile" button should be displayed when the first image is hovered on')

    await images[1].moveTo()
    assert.isTrue(await names[1].isDisplayed(), 'Second name should be displayed when the first image is hovered on')
    assert.isTrue(await viewProfileButton[1].isDisplayed(), 'Second "View Profile" button should be displayed when the first image is hovered on')

    await images[2].moveTo()
    assert.isTrue(await names[2].isDisplayed(), 'Third name should be displayed when the first image is hovered on')
    assert.isTrue(await viewProfileButton[2].isDisplayed(), 'Third "View Profile" button should be displayed when the first image is hovered on')

    await viewProfileButton[2].click()
    assert.equal(
      await browser.getUrl(),
      'https://the-internet.herokuapp.com/users/3',
      'should be redirected to https://the-internet.herokuapp.com/users/3 after clicking the view profile button',
    )
    assert.isTrue(await $('h1').isDisplayed(), 'the header Not Found should be displayed')
  })
})

describe('Opening a new window', () => {
  it('Should open a new window when clicking the button', async () => {
    browser.url('https://the-internet.herokuapp.com/windows')

    const clickHereLink = await $('//a[text()="Click Here"]')
    const initialWindows = await browser.getWindowHandles()
    const initialWindowCount = initialWindows.length

    assert.equal(await $('h3').getText(), 'Opening a new window', 'Header with "Opening a new window" text should be displayed')

    await clickHereLink.click()
    const Windows = await browser.getWindowHandles()
    const WindowCount = Windows.length

    assert.equal(WindowCount, initialWindowCount + 1, 'A new tab should be opened')

    const newTab = Windows.find((handle) => !initialWindows.includes(handle))

    await browser.switchToWindow(newTab)

    assert.equal(await browser.getUrl(), 'https://the-internet.herokuapp.com/windows/new', 'Should redirect correctly')
    assert.equal(await $('h3').getText(), 'New Window', 'New Window text should be present')
  })
})
