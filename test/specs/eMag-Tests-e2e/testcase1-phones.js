const CategoryPage = require('../../../eMagPages/CategoryPage.js')
const { testProductSortingAndFiltering } = require('./category-template.js')

testProductSortingAndFiltering(new CategoryPage('phones'), 'Мобилни телефони', 'Samsung')
