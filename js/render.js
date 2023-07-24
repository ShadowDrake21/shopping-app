import { creatingCategoryEl } from './categories.js'
import { createUserEl } from './users.js'
import {
  categoriesContainer,
  productContainer,
  usersContainer,
} from './requiredElements.js'
import { cleanContent, renderMessage } from './util.js'

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
      const {
        brand,
        category,
        description,
        discountPercentage,
        price,
        rating,
        stock,
        thumbnail,
        title,
      } = product

      const productWrapper = document.createElement('div')
      productWrapper.classList.add('product')

      productWrapper.innerHTML = `
    <div class="product__left">
      <img
        class="product__img"
        src="${thumbnail}"
        alt=""
      />
    </div>
    <div class="product__right">
      <span class="product__category">${brand}</span>
      <span class="product__category">${category}</span>
      <h3 class="product__title">
        ${title}
      </h3>
      <h6 class="product__price-old">${price}<span>$</span></h6>
      <h4 class="product__price">${Math.round(
        price - price * discountPercentage * 0.01
      )}<span>$</span></h4>
      <p class="product__descr">
        ${description}
      </p>
      <div class="product__additional">
        <div class="product__additional-text">
          Rate:<span class="product__additional-number product__additional-rate"
            >${rating}</span
          >
        </div>
        <div class="product__additional-text">
          Stock:<span class="product__additional-number product__additional-stock"
            >${stock}</span
          >
        </div>
      </div>
      <button id="addToCart" class="product__btn">Add to cart</button>
    </div>
    `

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
