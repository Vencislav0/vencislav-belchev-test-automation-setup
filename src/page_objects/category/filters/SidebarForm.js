import { BaseForm } from '../../../../framework/elementWrappers/BaseForm'
import { Label } from '../../../../framework/elementWrappers/Label'

export class SidebarForm extends BaseForm {
  constructor() {
    super('//div[@class="sidebar-tree-simple mb-2"]', 'Sidebar Container')
  }

  async clickItemByText(page, itemText) {
    const item = new Label(`//div[contains(@class, "hidden-xs")]//*[text()="${itemText}"]`, `Sidebar item: ${itemText}`)
    await item.click(page)
  }
}
