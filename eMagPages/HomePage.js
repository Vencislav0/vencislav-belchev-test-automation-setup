const Button = require('../framework/Button.js')
const Label = require('../framework/Label.js')
const BaseForm = require('../framework/BaseForm.js')
const Dropdown = require('../framework/Dropdown.js')
const Link = require('../framework/Link.js')
const Timeouts = require('../framework/timeouts.js')

class HomePage extends BaseForm {
  constructor() {
    super('[class = "main-container-outer"]', 'Home Page Main Container')
    this.phonesTabletsLaptopsLabel = new Label(
      '//span[@class="megamenu-list-department__department-name" and text()="Телефони, Таблети & Лаптопи"]',
      'Phones, Tablets and Laptops Label',
    )
    this.categoriesMenu = new Dropdown('[class = "navbar-aux-content__departments"]', 'Categories Dropdown Menu')
    this.mobilePhonesButton = new Button('//a[@class="megamenu-item" and @data-id="3861"]', 'Mobile Phones Button')
    this.sectionTitle = new Label('//h1[@class="title-phrasing title-phrasing-xl"]', 'Section Title')
    this.cookiesAcceptButton = new Button('//button[@class="btn btn-primary btn-block js-accept gtm_h76e8zjgoo"]', 'Accept Cookies Button')
    this.logIntoAccountDissmissButton = new Button(
      '//button[@class="js-dismiss-login-notice-btn dismiss-btn btn btn-link py-0 px-0"]',
      'Log Into Account Dismiss Button',
    )
    this.bigElectricalAppliancesLabel = new Label(
      '//span[@class="megamenu-list-department__department-name" and text()="Големи електроуреди"]',
      'Big Electrical Appliances Label',
    )
    this.airConditionersButton = new Button('//a[@class="megamenu-item" and @data-id="3187"]', 'Air Conditioners Button')
    this.beautyAndHealthLabel = new Label('//span[@class="megamenu-list-department__department-name" and text()="Здраве и красота"]', 'Beauty and Health Label')
    this.electricalRazersButton = new Button('//a[@class="megamenu-item" and @data-id="3906"]', 'Eletrical Razers Button')
    this.gamingLabel = new Label('//span[@class="megamenu-list-department__department-name" and text()="Gaming"]', 'Gaming Label')
    this.gamingConsolesButton = new Button('//a[@data-id="3721" and text()="Гейминг конзоли"]', 'Gaming Consoles Button')
    this.vrHeadSetsButton = new Button('//a[@data-id="3805" and text()="VR Gaming Очила"]', 'VR Head Sets button')
    this.facebookLink = new Link('//a[@class="btn btn-link font-size-lg text-primary"]/i', 'Facebook Page Link')
    this.youtubeLink = new Link('//a[@class="btn btn-link font-size-lg text-danger"]/i[@class="em em-youtube"]', 'Youtube Channel Link')
    this.instagramLink = new Link('//a[@class="btn btn-link font-size-lg text-danger"]/i[@class="em em-instagram"]', 'Instagram Page Link')
    this.youtubeAcceptCookiesButton = new Button('(//span[text()="Accept all"])[1]', 'Youtube Accept Cookies Button')
  }

  async clickFacebookLink() {
    await this.facebookLink.click()
  }

  async clickYoutubeLink() {
    await this.youtubeLink.click()
  }

  async clickInstagramLink() {
    await this.instagramLink.click()
  }

  async hoverOnCategoriesMenu() {
    await this.categoriesMenu.moveToElement()
  }

  async hoverOnGamingLabel() {
    await this.gamingLabel.moveToElement()
  }

  async clickOnGamingConsoleButton() {
    await this.gamingConsolesButton.click()
  }

  async clickOnVRHeadSetsButton() {
    await this.vrHeadSetsButton.click()
  }

  async hoverOnBeautyAndHealthLabel() {
    await this.beautyAndHealthLabel.moveToElement()
  }

  async clickOnElectricalRazersButton() {
    await this.electricalRazersButton.click()
  }

  async hoverOnBigElectricalAppliancesLabel() {
    await this.bigElectricalAppliancesLabel.moveToElement()
  }

  async clickOnAirConditionersButton() {
    await this.airConditionersButton.click()
  }

  async hoverOnPhonesTabletsAndLaptopsLabel() {
    await this.phonesTabletsLaptopsLabel.moveToElement()
  }

  async clickOnMobilePhonesButton() {
    await this.mobilePhonesButton.click()
  }

  async getSectionTitleText() {
    return this.sectionTitle.getText()
  }

  async acceptCookiesIfNeeded() {
    if (await this.cookiesAcceptButton.isDisplayed()) {
      await this.cookiesAcceptButton.click()
    }
  }

  async acceptYoutubeCookiesIfNeeded() {
    if (await this.youtubeAcceptCookiesButton.isDisplayed()) {
      await this.youtubeAcceptCookiesButton.click()
      await browser.waitUntil(
        async () => {
          return (await browser.isLoading()) === false
        },
        { timeout: Timeouts.SHORT_TIMEOUT, timeoutMsg: 'Couldnt load page' },
      )
    }
  }

  async dissmissAccountLoginPopUpIfNeeded() {
    if (await this.logIntoAccountDissmissButton.isDisplayed()) {
      this.logIntoAccountDissmissButton.click()
    }
  }
}

module.exports = HomePage
