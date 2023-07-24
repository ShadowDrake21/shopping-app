import { creatingCategoryEl } from './categories.js'
import { createUserEl } from './users.js'
import {
  categoriesContainer,
  productContainer,
  usersContainer,
} from './requiredElements.js'
import { cleanContent, renderMessage } from './util.js'
import { createProductWrapper } from './createElements.js'

// function of rendering product items to the screen
export function renderProducts(productArr) {
  cleanContent(productContainer)
  if (!productArr.length) {
    renderMessage(
      'null__result-message',
      `Ooops, it seems like there is nothing as a result of your search. <br> Search something else`,
      productContainer
    )
  } else {
    productArr.map((product) => {
      const productWrapper = document.createElement('div')

      productWrapper.classList.add('product')
      productWrapper.innerHTML = createProductWrapper(product)
      productContainer.appendChild(productWrapper)
    })
  }
}

// function to render all categories to the screen
export function renderAllCategories(categoriesArr) {
  cleanContent(categoriesContainer)

  if (!categoriesArr.length) {
    renderMessage(
      'null__result-message',
      `Ooops, it seems like something went wrong! Try one more time!`,
      categoriesContainer
    )
  } else {
    categoriesArr.map((category) => {
      categoriesContainer.appendChild(creatingCategoryEl(category))
    })
  }
}

// function to render all users
export function renderUsers(usersArr) {
  cleanContent(usersContainer)
  if (!usersArr.length) {
    renderMessage(
      'null__result-message',
      `No users! There is an error!`,
      usersContainer
    )
  } else {
    usersArr.map((user) => {
      usersContainer.appendChild(createUserEl(user))
    })
  }
}
