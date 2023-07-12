const form = document.getElementById('form')
const search = document.getElementById('search')
const searchBtn = document.getElementById('searchBtn')

const productContainer = document.getElementById('product__container')

const API_URL = 'https://dummyjson.com/products/'
const SEARCH_FRAGMENT = 'search?q='
const CATEGORIES_FRAGMENT = 'category/'

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  productContainer.innerHTML = ''

  const searchTerm = e.target[0].value

  const products = await fetch(API_URL + SEARCH_FRAGMENT + searchTerm).then(
    (res) => res.json()
  )

  renderProducts(products.products)
})

function renderProducts(productArr) {
  console.log(productArr)
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
      <h6 class="product__price">${price}<span>$</span></h6>
      <p class="product__descr">
        ${description}
      </p>
      <div class="product__rating">
        <div class="product__rating-text">
          Rate:<span class="product__rating-number product__rating-rate"
            >${rating}</span
          >
        </div>
        <div class="product__rating-text">
          Count:<span class="product__rating-number product__rating-count"
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
