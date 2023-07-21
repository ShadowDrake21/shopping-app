// Getting all require elements by ids
const productsForm = document.getElementById('productsForm')
const productsSearch = document.getElementById('productsSearch')
const productsBtn = document.getElementById('productsBtn')
const productContainer = document.getElementById('product__container')
const productsSection = document.getElementById('productsSection')

const categoriesSection = document.getElementById('categoriesSection')
const categoriesForm = document.getElementById('categoriesForm')
const categoriesSearch = document.getElementById('categoriesSearch')
const categoriesBtn = document.getElementById('categoriesBtn')
const categoriesContainer = document.getElementById('categories__container')

const usersSection = document.getElementById('usersSection')
const usersForm = document.getElementById('usersForm')
const usersSearch = document.getElementById('usersSearch')
const usersBtn = document.getElementById('usersBtn')
const usersContainer = document.getElementById('users__container')

const title = productsSection.querySelector('.section__title')
const menu = document.getElementById('menu')
const menuLinks = document.querySelectorAll('.menu__item-link')
const menuList = document.getElementById('menu__list')

const authorizationList = document.getElementById('authorization__list')
const popupBackground = document.querySelector('.popup__bg')

const profileHeader = document.getElementById('profileHeader')
const profileHeaderImage = document.getElementById('profileHeaderImage')
const profileHeaderName = document.getElementById('profileHeaderName')

let loginCloseBtn,
  loginBtn,
  loginForm,
  loginName,
  loginPassword,
  profileObj = {}

// Constants for fetching
const API_URL = 'https://dummyjson.com/products/'
const USERS_API = 'https://dummyjson.com/users'
const SEARCH_FRAGMENT = 'search?q='
const CATEGORIES_FRAGMENT = 'category/'
const LIMIT_FRAGMENT = '?limit='

renderMessage(
  'initial__message',
  `There is nothing here ;) <br>Type your query in the search field above`,
  productContainer
)

loadingFromLS()

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

// function of message rendering
function renderMessage(classPar, messagePar, container) {
  const message = document.createElement('p')
  message.classList.add(classPar)

  message.innerHTML = messagePar
  container.appendChild(message)
}

// menu usage, tabs cooperation, content hidding/showing
menuList.addEventListener('click', (e) => {
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
    if (e.target.dataset.to === 'usersSection') {
      getAllUsers()
    }
  }
})

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

// function with fetch query, get all categories
async function getAllCategories() {
  const categories = await fetch(API_URL + 'categories').then((res) =>
    res.json()
  )
  renderAllCategories(categories)
}

// function to render all categories to the screen
function renderAllCategories(categoriesArr) {
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
    title.innerText = category ? replacingDashes(category) : 'Error 404'
  }
})

// util function to get all users and render them
async function getAllUsers() {
  const allUsers = await fetchAllUsers()
  renderUsers(allUsers.users)
}

// fetch function to get all users
async function fetchAllUsers() {
  const allUsers = await fetch(USERS_API + LIMIT_FRAGMENT + 100).then((res) =>
    res.json()
  )
  return allUsers
}

// function to render all users
function renderUsers(usersArr) {
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

// function to create user block
function createUserEl(user) {
  const {
    id,
    firstName,
    lastName,
    age,
    gender,
    email,
    phone,
    birthDate,
    image,
    address: { city },
  } = user

  const userWrapper = document.createElement('div')
  userWrapper.classList.add('user__item')
  userWrapper.id = `user${id}`

  userWrapper.innerHTML = `
<div class="user__item-left">
  <img
    src="${image}"
    class="user__item-img"
    alt=""
  />
</div>
<div class="user__item-right">
  <div class="user__bio">
    <p class="user__bio-name">First name: ${firstName}</p>
    <p class="user__bio-name">Last name: ${lastName}</p>
    <p class="user__bio-age">Age: ${age}</p>
    <p class="user__bio-gender">Gender: ${gender}</p>

    <p class="user__bio-email">Email: ${email}</p>
    <p class="user__bio-phone">Phone: ${phone}</p>
    <p class="user__bio-birthday">Birthday: ${birthDate}</p>
    <p class="user__bio-city">City: ${city}</p>
  </div>
</div>
`
  return userWrapper
}

// users form event, search for the user
usersForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  cleanContent(usersContainer)
  const searchTerm = e.target[0].value

  const { users } = await fetch(
    USERS_API + '/' + SEARCH_FRAGMENT + searchTerm
  ).then((res) => res.json())
  e.target[0].value = ''
  title.innerText = searchTerm
  console.log(users)
  if (!users.length) {
    renderMessage(
      'null__result-message',
      `No users are found! Check something else or check your spelling!`,
      usersContainer
    )
  } else {
    users.map((user) => {
      usersContainer.appendChild(createUserEl(user))
    })
  }
})

// authorization event, popup choosing
authorizationList.addEventListener('click', (e) => {
  const popupFunc =
    e.target.dataset.popupfunc === 'createLogin' ? createLogin : null
  const popupId = e.target.dataset.popupid

  createPopup(popupFunc)

  const popupEl = document.getElementById(popupId)
  console.log(popupId)
  setStylesPopup(popupEl, 'block')
  setEventOnBackground(popupEl)
})

// main function of creating popup
function createPopup(createPopupHTML) {
  const popup = createPopupHTML()
  document.body.appendChild(popup)
  initPopupElements()
}

// create popup function, login popup initialization
function createLogin() {
  const popupWrapper = document.createElement('div')
  popupWrapper.classList.add('login__popup')
  popupWrapper.id = 'login'

  popupWrapper.innerHTML = `
      <div class="login__inner">
        <h2 class="login__title">Log-in</h2>
        <form class="form login__form" id="loginForm">
          <div class="login__input-wrapper">
            <label for="loginName" class="login_label">Username:</label
            ><input
              type="text"
              class="login__input"
              id="loginName"
              placeholder="Enter your username"
            />
          </div>
          <div class="login__input-wrapper">
            <label for="loginPassword" class="login_label">Password:</label
            ><input
              type="password"
              class="login__input"
              id="loginPassword"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" class="login__btn" id="loginBtn">
            Sign-in
          </button>
        </form>
        <button type="button" id="loginClose" class="login__close-btn">
          <i class="fa fa-window-close" aria-hidden="true"></i>
        </button>
      </div>
  `

  return popupWrapper
}

// destroyer of popup
function destroyPopup(popupId) {
  const popup = document.getElementById(popupId)
  popup.remove()
}

// util function to set timeout on destroyer function
function destroyTimeout(popup) {
  setTimeout(() => {
    destroyPopup(popup)
  }, 3100)
}

// util function to initialized all required elements of the popup
function initPopupElements() {
  loginCloseBtn = document.getElementById('loginClose')
  loginBtn = document.getElementById('loginBtn')
  loginForm = document.getElementById('loginForm')
  loginName = document.getElementById('loginName')
  loginPassword = document.getElementById('loginPassword')
}

// function to hide the background
function setEventOnBackground(popupEl) {
  popupBackground.addEventListener('click', () => {
    setStylesPopup(popupEl, 'none')
  })
}

// util function to set styles to popup and background
function setStylesPopup(popupEl, style) {
  popupEl.style.display = style
  popupBackground.style.display = style
}

// popup close btn function
document.addEventListener('click', (e) => {
  const target = e.target.closest('[id=loginClose]')

  if (target) {
    console.log(target)
    setStylesPopup(e.target.closest('[id=login]'), 'none')
  }
})

// popup sybmit function
document.addEventListener('submit', async (e) => {
  e.preventDefault()
  console.log(e.target.closest('[id=loginForm]'))

  if (e.target.closest('[id=loginForm]')) {
    const loginPopup = document.getElementById('login')
    let thereIsName = false,
      thereIsPass = false,
      foundUser = {}
    const name = loginName.value
    const pass = loginPassword.value

    const { users } = await fetchAllUsers()
    users.forEach((user) => {
      if (user.username === name) {
        thereIsName = true
        foundUser = user
        return
      }
    })

    if (thereIsName) {
      const { password } = foundUser
      thereIsPass = password === pass ? true : false
    } else {
      showResultPopupMessage(
        loginPopup,
        'null__result-message',
        `User with that username is not found! <br>Try one more time`
      )
      destroyTimeout(loginPopup.id)
      return
    }

    if (thereIsName && thereIsPass) {
      showResultPopupMessage(
        loginPopup,
        'success__result-message',
        `Welcome back, ${name}!`
      )

      localStorage.setItem(
        'profileData',
        JSON.stringify(minimalizeObject(foundUser))
      )

      loadingFromLS()
      destroyTimeout(loginPopup.id)
      return
    } else {
      showResultPopupMessage(
        loginPopup,
        'null__result-message',
        `Password is invalid! <br>Try one more time`
      )
      destroyTimeout(loginPopup.id)
      return
    }
  }
})

// 9uQFF1Lh

// util function to  set timeout to popup hidding
function popupTimeout(popup) {
  setTimeout(() => {
    setStylesPopup(popup, 'none')
  }, 3000)
}

// util function to show final messages of the working with popup
function showResultPopupMessage(popupEl, messageClass, messageText) {
  cleanContent(popupEl)
  renderMessage(messageClass, messageText, popupEl)
  popupTimeout(popupEl)
}

// util function to remove unnecessary fields of object
function minimalizeObject(oldObj) {
  return {
    username: oldObj.username,
    password: oldObj.password,
    img: oldObj.image,
    firstName: oldObj.firstName,
    lastName: oldObj.lastName,
  }
}

// function to load data from LocalStorage
function loadingFromLS() {
  profileObj = JSON.parse(localStorage.getItem('profileData'))
  if (!profileObj) {
    return
  } else {
    authorizationList.style.display = 'none'
    profileHeader.style.display = 'flex'
    profileHeaderImage.src = profileObj.img
    profileHeaderName.innerText = `${profileObj.firstName} ${profileObj.lastName}`
  }
}

// util function to clean content of specified container
function cleanContent(container) {
  container.innerHTML = ''
}
