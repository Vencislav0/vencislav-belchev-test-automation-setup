const FilterForm = require('./BaseFilterForm.js')

class DeliveredByFilterForm extends FilterForm {
  constructor() {
    super('//div[@class="filter filter-default js-filter" and @data-name="Доставени от"]', 'Manufacturer Filter Locator')
  }
}

module.exports = DeliveredByFilterForm
