import { BaseForm } from "../framework/elementWrappers/BaseForm"
import { Button } from "../framework/elementWrappers/Button"
import { Timeouts } from "../framework/timeouts"

export class YoutubeChannelPage extends BaseForm {
    constructor() {
      super('//ytd-page-manager[@id="page-manager"]', 'Youtube Channel Container')
      this.youtubeAcceptCookiesButton = new Button('(//span[text()="Accept all"])[1]', 'Youtube Accept Cookies Button')
    }
  
    async acceptYoutubeCookiesIfNeeded(page) {
      if (await this.youtubeAcceptCookiesButton.isVisible(page)) {
        await this.youtubeAcceptCookiesButton.click(page)
        await page.waitForLoadState()
      }
    }
  }