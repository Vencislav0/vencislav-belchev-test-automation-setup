const { assert } = require('chai')
const path = require('path')
const fs = require('fs')

//Couldn't get this one to pass, there is an issue when rightclicking the context menu, the alert automatically dissapears likely due to how automation is handeled on this specific page.
//Alert is clearly shown but cant be caught.
describe('Context Menu e2e', () => {
  before(async () => {
    await browser.url('https://the-internet.herokuapp.com/context_menu')
  })
  it('Alert should appear when context menu is right clicked', async () => {
    const contextMenu = await $('#hot-spot')

    await contextMenu.click({ button: 2, skipRelease: true })

    await browser.waitUntil(async () => await browser.isAlertOpen(), { timeout: 5000, timeoutMsg: 'Alert did not appear within 5 seconds' })

    assert.equal(await browser.getAlertText(), 'You selected a context menu', "Couldn't get the alert text")

    await browser.acceptAlert()
  })
})

describe('Dynamic Controls e2e', () => {
  before(async () => {
    await browser.url('https://the-internet.herokuapp.com/dynamic_controls')
  })
  it('Verifying all async operations on the page', async () => {
    // remove/add elements
    const removeButton = await $('//button[text()="Remove"]')
    const addButton = await $('//button[text()="Add"]')
    let checkbox = await $('//input[@type="checkbox"]')
    let message = await $('//p[@id="message"]')

    // enable/disable elements
    const inputField = await $('//input[@type="text"]')
    const enableButton = await $('//button[text()="Enable"]')
    const disableButton = await $('//button[text()="Disable"]')

    //Actions on remove/add elements
    assert.isTrue(await checkbox.isDisplayed(), 'Checkbox is not visible')

    await removeButton.click()
    await browser.waitUntil(async () => await message.isDisplayed(), { timeout: 5000, timeoutMsg: 'Message did not appear' })

    assert.equal(await message.getText(), "It's gone!")
    assert.isFalse(await checkbox.isDisplayed(), "Checkbox shouldn't be visible after operation")

    await addButton.click()
    message = await $('//p[@id="message"]')
    await browser.waitUntil(async () => await message.isDisplayed(), { timeout: 5000, timeoutMsg: 'Message did not appear' })

    assert.equal(await message.getText(), "It's back!")
    checkbox = await $('//input[@type="checkbox"]')
    assert.isTrue(await checkbox.isDisplayed(), 'Checkbox is not visible')

    //Actions on enable/disable elements
    assert.isFalse(await inputField.isEnabled(), 'Input field should be disabled initially')

    await enableButton.click()
    message = await $('//p[@id="message"]')
    await browser.waitUntil(async () => await message.isDisplayed(), { timeout: 5000, timeoutMsg: 'Message did not appear' })

    assert.equal(await message.getText(), "It's enabled!")
    assert.isTrue(await inputField.isEnabled(), 'Input field should be enabled after clicking the button')

    await disableButton.click()
    message = await $('//p[@id="message"]')
    await browser.waitUntil(async () => await message.isDisplayed(), { timeout: 5000, timeoutMsg: 'Message did not appear' })

    assert.equal(await message.getText(), "It's disabled!")
    assert.isFalse(await inputField.isEnabled(), 'Input field should be disabled after clicking the button')
  })
})

describe('File Upload', () => {
  it('File should be uploaded successfuly and file name displayed', async () => {
    await browser.url('https://the-internet.herokuapp.com/upload')

    const chooseFileButton = await $('#file-upload')
    const submitFileButton = await $('#file-submit')
    const fileName = 'fileToUpload.txt'

    const filePath = `./${fileName}`
    const remotePath = await browser.uploadFile(filePath)

    await chooseFileButton.setValue(remotePath)
    await submitFileButton.click()

    const pageText = await $('#uploaded-files').getText()

    assert.equal(pageText, fileName)
  })
})

describe('IFrames', () => {
  it('Verifying the IFrame', async () => {
    await browser.url('https://the-internet.herokuapp.com/frames')

    const iframeButton = await $('//a[@href="/iframe"]')

    await iframeButton.click()
    const iframe = await $('#mce_0_ifr')

    await browser.switchFrame(iframe)
    const textInFrame = await $('//p')

    assert.equal(await textInFrame.getText(), 'Your content goes here.')

    await browser.switchToParentFrame()
  })
})

describe('Download File', () => {
  it('Verifying file download', async () => {
    await browser.url('https://the-internet.herokuapp.com/download')
    const txtFileExtentions = await $$('//a[contains(text(), ".txt") or contains(text(), ".json") or contains(text(), ".png") or contains(text(), ".jpg")]')

    assert.isAbove(txtFileExtentions.length, 0, 'there should be atleast 1 .txt file')

    const randomFile = txtFileExtentions[Math.floor(Math.random() * txtFileExtentions.length)]
    const randomFileText = await randomFile.getText()

    const downloadDir = path.resolve(__dirname, '../../downloads')
    const fileLink = await $(`//a[text()="${await randomFile.getText()}"]`)

    await fileLink.click()

    const downloadedFilePath = path.join(downloadDir, randomFileText)

    await browser.waitUntil(async () => fs.existsSync(downloadedFilePath), { timeout: 20000, timeoutMsg: "Couldn't download the file" })

    assert.isTrue(fs.existsSync(downloadedFilePath), 'File should exist after download')

    fs.unlinkSync(downloadedFilePath)
  })
})
