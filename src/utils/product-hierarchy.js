import { map, uniqBy, filter, orderBy } from 'lodash'
import React from 'react'

import ProductWidget from '../components/productWidget'

/*
  Documentation on the following dynamicSort function:
  https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
*/
function dynamicSort(property) {
  let sortOrder = 1;

  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function(a, b) {
    if (sortOrder === -1)
      return b[property].localeCompare(a[property]);
    else
      return a[property].localeCompare(b[property]);
  }
}

const getProductCategoriesOriginal = function (products) {
  /*
  console.log('%c products:', 'color: brown; font-weight: bold;')
  console.log({ products })
  */
  // Filters by name=__CATEGORY__, then order it by category_order first and alphabetical after
  return uniqBy(map(orderBy(filter(products, (product) => product.name === "__CATEGORY__"),
    [ 'category_order', 'label' ]),
    product => ({
      category: product.category,
      label: product.label,
      short: product.short
    })),
    product => product.category)

}

export const getProductCategories = function(products) {

  /*
    NOTE: I now know what the above function does:

    It takes all of the products that are fed to it, and sorts their categories by the following criteria:

    category_order first, and then...
    label

    So you're going to want to loop through each product and get its category_order value and add that to an array
  
  */

  /*
  console.log('%c products:', 'color: purple; font-weight: bold;')
  console.log({ products })
  */

  const uniqueProductCategories = []

  products.forEach((product, i) => {
    /*
    const categoryPosition = product.category
    if (!uniqueProductCategories[categoryPosition]) {
      uniqueProductCategories[categoryPosition].push({
        label: product.label,
        short: product.short
      })
    }
    */

    let categoryExists = false

    uniqueProductCategories.forEach((pc, j) => {
      if (product.category === pc.category)
        categoryExists = true
    })

    if (!categoryExists) {
      uniqueProductCategories.push({
        category: product.category,
        label: product.label,
        short: product.short
      })
    }
  })

  const alphabetizedUniqueProductCategories = uniqueProductCategories.sort(dynamicSort('label'))
  /*
  console.log('%c alphabetizedUniqueProductCategories:', 'color: red; font-weight: bold;')
  console.log({ alphabetizedUniqueProductCategories })
  */
  return alphabetizedUniqueProductCategories
}

export const displayProductHierarchy = function (rootProducts, products) {
  /*
  console.log('%c rootProducts, products:', 'color: maroon; font-weight: bold;')
  console.log({ rootProducts, products })
  */
  let secondLevel = {}
  let showCategory = {}
  rootProducts.forEach(product => {
    secondLevel[product.category] = []
    showCategory[product.category] = true
  })
  /*
  console.log('%c secondLevel, showCategory:', 'color: LightCoral; font-weight: bold;')
  console.log({ secondLevel, showCategory })
  */
  products.forEach((product) => {
    secondLevel[product.category].push(product)
    /*
    if (product.name === '__CATEGORY__') {
      showCategory[product.category] = true
    }
    */
  })

  if (rootProducts && rootProducts.length > 0) {
    return (
      <ul>
        {map(rootProducts, (rootItem, index) =>
        showCategory[rootItem.category] ?
          <ProductWidget key={index} rootItem={rootItem} secondLevel={secondLevel} />
          :
          null
        )}
      </ul>
    )
  }
  return null;
}
