const form = document.getElementById('form')
const search = document.getElementById('search')
const searchBtn = document.getElementById('searchBtn')
const productContainer = document.getElementById('product__container')

const API_URL = 'https://dummyjson.com/products/'
const SEARCH_FRAGMENT = 'search?q='
const CATEGORIES_FRAGMENT = 'category/'

renderMessage(
  'initial__message',
  `There is nothing here ;) <br>Type your query in the search field above`
)

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

function renderMessage(classPar, messagePar) {
  const message = document.createElement('p')
  message.classList.add(classPar)

  message.innerHTML = messagePar
  productContainer.appendChild(message)
}
