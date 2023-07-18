// Getting all require elements by ids
const productsForm = document.getElementById('productsForm')
const productsSearch = document.getElementById('productsSearch')
const productsBtn = document.getElementById('productsBtn')
const productContainer = document.getElementById('product__container')
const productsSection = document.getElementById('productsSection')
const categoriesSection = document.getElementById('categoriesSection')
const menu = document.getElementById('menu')
const menuLinks = document.querySelectorAll('.menu__item-link')

const categoriesForm = document.getElementById('categoriesForm')
const categoriesSearch = document.getElementById('categoriesSearch')
const categoriesBtn = document.getElementById('categoriesBtn')
const categoriesContainer = document.getElementById('categories__container')

// Constants for fetching
const API_URL = 'https://dummyjson.com/products/'
const SEARCH_FRAGMENT = 'search?q='
const CATEGORIES_FRAGMENT = 'category/'

renderMessage(
  'initial__message',
  `There is nothing here ;) <br>Type your query in the search field above`,
  productContainer
)

// products form event, using of fetch
productsForm.addEventListener('submit', async (e) => {
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
  productContainer.innerHTML = ''
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

// function of message rendering
function renderMessage(classPar, messagePar, container) {
  const message = document.createElement('p')
  message.classList.add(classPar)

  message.innerHTML = messagePar
  container.appendChild(message)
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

    if (e.target.dataset.to === 'categoriesSection') {
      getAllCategories()
    }
  }
})

// categories form event, using of fetch
categoriesForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  categoriesContainer.innerHTML = ''
  const searchTerm = e.target[0].value
  let foundCategory = ''

  const categories = await fetch(API_URL + 'categories').then((res) =>
    res.json()
  )
  e.target[0].value = ''
  console.log(categories)

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

// function with fetch query, get all categories
async function getAllCategories() {
  const categories = await fetch(API_URL + 'categories').then((res) =>
    res.json()
  )
  console.log(categories)
  renderAllCategories(categories)
}

// function to render all categories to the screen
function renderAllCategories(categoriesArr) {
  categoriesContainer.innerHTML = ''
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

// util function to replacing dashes with white spaces
function replacingDashes(text, replacingEl = ' ') {
  return text.replace(/-/g, replacingEl)
}

// util function to create category element
function creatingCategoryEl(category) {
  id = replacingDashes(category, '__')
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
    const title = productsSection.querySelector('.section__title')
    title.innerText = category ? replacingDashes(category) : 'Error 404'
  }
})
