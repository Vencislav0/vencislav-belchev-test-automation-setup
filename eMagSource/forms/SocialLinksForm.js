const BaseForm = require('../../framework/BaseForm.js')
const Link = require('../../framework/elementWrappers/Link.js')

class SocialLinksForm extends BaseForm {
  constructor() {
    super('//div[@class="col-md-3 text-center"]', 'Social Media Links Container')
    this.facebookLink = new Link('//a/i[@class="em em-facebook"]', 'Facebook Page Link')
    this.youtubeLink = new Link('//a/i[@class="em em-youtube"]', 'Youtube Channel Link')
    this.instagramLink = new Link('//a/i[@class="em em-instagram"]', 'Instagram Page Link')
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
}

module.exports = SocialLinksForm
