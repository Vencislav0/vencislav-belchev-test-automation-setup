const BaseForm = require('../../framework/BaseForm')
const Dropdown = require('../../framework/Dropdown.js')
const Button = require('../../framework/Button.js')

class AgeVerificationPage extends BaseForm {
  constructor() {
    super('//div[@class="main_content_ctn"]', 'Verification Form Container')
    this.monthDayDropdown = new Dropdown('//select[@id="ageDay"]', 'Day Of The Month Dropdown')
    this.monthDropdown = new Dropdown('//select[@id="ageMonth"]', 'Month Dropdown')
    this.yearDropdown = new Dropdown('//select[@id="ageYear"]', 'Year Dropdown')
    this.viewPageButton = new Button('//a[@id="view_product_page_btn"]', 'View Page Button')
    this.cancelButton = new Button('//span[text()="Cancel"]', 'Cancel Button')
  }

  async selectMonthDay(day) {
    await this.monthDayDropdown.selectByText(day)
  }

  async selectMonth(month) {
    await this.monthDropdown.selectByText(month)
  }

  async selectYear(year) {
    await this.yearDropdown.selectByText(year)
  }

  async clickViewPageButton() {
    await this.viewPageButton.click()
  }
}

module.exports = AgeVerificationPage
