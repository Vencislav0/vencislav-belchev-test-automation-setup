const CategoryPage = require('../../../eMagPages/CategoryPage.js')
const { testProductSortingAndFiltering } = require('./category-template.js')

testProductSortingAndFiltering(new CategoryPage('electricalRazers'), 'Електрически самобръсначки', 'Braun', 'Браун', 'Ел. самобръсначки')
