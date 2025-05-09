import { BaseForm } from "../../framework/elementWrappers/BaseForm"
import { Link } from "../../framework/elementWrappers/Link"

export class SocialLinksForm extends BaseForm { 
    constructor() {
      super('//div[@class="col-md-3 text-center"]', 'Social Media Links Container')
      this.facebookLink = new Link('//a/i[@class="em em-facebook"]', 'Facebook Page Link')
      this.youtubeLink = new Link('//a/i[@class="em em-youtube"]', 'Youtube Channel Link')
      this.instagramLink = new Link('//a/i[@class="em em-instagram"]', 'Instagram Page Link')
    }
  
    async clickFacebookLink(page) {
      await this.facebookLink.click(page)
    }
  
    async clickYoutubeLink(page) {
      await this.youtubeLink.click(page)
    }
  
    async clickInstagramLink(page) {
      await this.instagramLink.click(page)
    }
  }