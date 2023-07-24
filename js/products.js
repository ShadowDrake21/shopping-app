import { API_URL, SEARCH_FRAGMENT } from './constants.js'
import { cleanContent, renderMessage } from './util.js'

// Getting all require elements by ids
const productsForm = document.getElementById('productsForm')
const productContainer = document.getElementById('product__container')
const productsSection = document.getElementById('productsSection')
const title = productsSection.querySelector('.section__title')

renderMessage(
  'initial__message',
  `There is nothing here ;) <br>Type your query in the search field above`,
  productContainer
)

// products form event, using of fetch
productsForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  cleanContent(productContainer)
  const searchTerm = e.target[0].value

  const products = await fetch(API_URL + SEARCH_FRAGMENT + searchTerm).then(
    (res) => res.json()
  )
  e.target[0].value = ''
  title.innerText = searchTerm
  renderProducts(products.products)
})

// function of rendering product items to the screen
function renderProducts(productArr) {
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
