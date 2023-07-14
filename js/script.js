// Getting all require elements by ids
const form = document.getElementById('form')
const search = document.getElementById('search')
const searchBtn = document.getElementById('searchBtn')
const productContainer = document.getElementById('product__container')
const searchSection = document.getElementById('search')
const categoriesSection = document.getElementById('categories')
const menu = document.getElementById('menu')
const menuLinks = document.querySelectorAll('.menu__item-link')

// Constants for fetching
const API_URL = 'https://dummyjson.com/products/'
const SEARCH_FRAGMENT = 'search?q='
const CATEGORIES_FRAGMENT = 'category/'

renderMessage(
  'initial__message',
  `There is nothing here ;) <br>Type your query in the search field above`
)

// form event, using of fetch
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  productContainer.innerHTML = ''
  const searchTerm = e.target[0].value

  const products = await fetch(API_URL + SEARCH_FRAGMENT + searchTerm).then(
    (res) => res.json()
  )
  e.target[0].value = ''
  renderProducts(products.products)
})

// function of rendering product items to the screen
function renderProducts(productArr) {
  if (!productArr.length) {
    renderMessage(
      'null__result-message',
      `Ooops, it seems like there is nothing as a result of your search. <br> Search something else`
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

// function of message rendering
function renderMessage(classPar, messagePar) {
  const message = document.createElement('p')
  message.classList.add(classPar)

  message.innerHTML = messagePar
  productContainer.appendChild(message)
}

// menu usage, tabs cooperation, content hidding/showing
menu.addEventListener('click', (e) => {
  if (!e.target.classList.contains('active')) {
    const parent = e.target.closest('.menu__list')
    const successors = parent.querySelectorAll('.menu__item')

    successors.forEach((successor) => {
      const successorChild = successor.children[0]
      const classes = successorChild.classList
      if (classes.contains('active')) {
        successorChild.classList.remove('active')
        const prevContent = document.getElementById(successorChild.dataset.to)
        prevContent.classList.remove('active')
        return
      }
    })

    const newContent = document.getElementById(e.target.dataset.to)
    e.target.classList.add('active')
    newContent.classList.add('active')
  }
})
