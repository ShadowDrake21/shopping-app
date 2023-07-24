import { API_URL, CATEGORIES_FRAGMENT } from './constants.js'
import { renderProducts } from './render.js'
import {
  categoriesForm,
  categoriesContainer,
  productContainer,
  title,
} from './requiredElements.js'
import { cleanContent, renderMessage, replacingDashes } from './util.js'

// categories form event, using of fetch
categoriesForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  cleanContent(categoriesContainer)
  const searchTerm = e.target[0].value
  let foundCategory = ''

  const categories = await fetch(API_URL + 'categories').then((res) =>
    res.json()
  )
  e.target[0].value = ''

  categories.forEach((category) => {
    if (replacingDashes(category).toLowerCase() === searchTerm.toLowerCase()) {
      foundCategory = category
    }
  })

  if (!foundCategory) {
    renderMessage(
      'null__result-message',
      `Ooops, there no category with such name! <br>Check your spelling or search something else`,
      categoriesContainer
    )
  } else {
    categoriesContainer.appendChild(creatingCategoryEl(foundCategory))
  }
})

// util function to create category element
export function creatingCategoryEl(category) {
  const categoryWrapper = document.createElement('div')
  categoryWrapper.classList.add('category')
  categoryWrapper.dataset.category = category.toLowerCase()
  category = replacingDashes(category)

  categoryWrapper.innerHTML = `
  <h3 class="category__name">${category}</h3>
  `
  return categoryWrapper
}

// function to see all products of choosen category
categoriesContainer.addEventListener('click', async (e) => {
  if (e.target.closest('div[data-category]')) {
    const category = e.target.dataset.category
    const products = await fetch(API_URL + CATEGORIES_FRAGMENT + category).then(
      (res) => res.json()
    )
    document.querySelector('[data-to="productsSection"]').click()
    renderProducts(products.products)
    window.scrollTo(0, productContainer.offsetTop)
    title.innerText = category ? replacingDashes(category) : 'Error 404'
  }
})
