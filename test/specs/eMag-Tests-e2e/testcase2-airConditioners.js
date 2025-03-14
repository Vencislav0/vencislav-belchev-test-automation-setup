const CategoryPage = require('../../../eMagPages/CategoryPage.js')
const { testProductSortingAndFiltering } = require('./category-template.js')

testProductSortingAndFiltering(new CategoryPage('airConditioners'), 'Климатици', 'Daikin', 'Дайкин')
