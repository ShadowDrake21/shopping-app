import { API_URL, SEARCH_FRAGMENT } from './constants.js'
import { cleanContent, renderMessage } from './util.js'
import { productsForm, productContainer, title } from './requiredElements.js'
import { renderProducts } from './render.js'

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
