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

const signOutBtn = document.getElementById('profileExit')

let loginCloseBtn, loginBtn, loginForm, loginName, loginPassword

let signupCloseBtn,
  signupBtn,
  signupForm,
  signupEmail,
  signupFn,
  signupLn,
  signupName,
  signupPassword

let profileObj = {}

// Constants for fetching
const API_URL = 'https://dummyjson.com/products/'
const USERS_API = 'https://dummyjson.com/users'
const SEARCH_FRAGMENT = 'search?q='
const CATEGORIES_FRAGMENT = 'category/'
const LIMIT_FRAGMENT = '?limit='
const DEFAULT_IMAGE =
  'https://theculturednerd.org/wp-content/uploads/2021/10/hayden-christensen-star-wars.jpeg'

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
    e.target.dataset.popupfunc === 'createLogin' ? createLogin : createSignup
  const popupData = e.target.dataset.popupid

  createPopup(popupFunc, popupData)

  const popupEl = document.querySelector(`[data-popup=${popupData}`)
  setStylesPopup(popupEl, 'block')
  setEventOnBackground(popupEl)
})

// main function of creating popup
function createPopup(createPopupHTML, popupId) {
  const popup = createPopupHTML()
  document.body.appendChild(popup)
  initPopupElements(popupId)
}

// util function to initialized all required elements of the popup
function initPopupElements(popupId) {
  if (popupId === 'login') {
    initLoginElements()
  } else if (popupId === 'signup') {
    initSignupElements()
  }
}

// util function to initialized all elements of login popup
function initLoginElements() {
  loginCloseBtn = document.getElementById('loginClose')
  loginBtn = document.getElementById('loginBtn')
  loginForm = document.getElementById('loginForm')
  loginName = document.getElementById('loginName')
  loginPassword = document.getElementById('loginPassword')
}

// util function to initialized all elements of signup popup
function initSignupElements() {
  signupCloseBtn = document.getElementById('signupClose')
  signupBtn = document.getElementById('signupBtn')
  signupForm = document.getElementById('signupForm')
  signupEmail = document.getElementById('signupEmail')
  signupFn = document.getElementById('signupFn')
  signupLn = document.getElementById('signupLn')
  signupName = document.getElementById('signupName')
  signupPassword = document.getElementById('signupPassword')
}

// create popup function, login popup initialization
function createLogin() {
  const popupWrapper = document.createElement('div')
  popupWrapper.classList.add('popup')
  popupWrapper.id = 'login'
  popupWrapper.dataset.popup = 'login'

  popupWrapper.innerHTML = `
      <div class="popup__inner">
        <h2 class="popup__title">Log-in</h2>
        <form class="form popup__form" id="loginForm">
          <div class="popup__input-wrapper">
            <label for="loginName" class="popup_label">Username:</label
            ><input
              type="text"
              class="popup__input"
              id="loginName"
              placeholder="Enter your username"
            />
          </div>
          <div class="popup__input-wrapper">
            <label for="loginPassword" class="popup_label">Password:</label
            ><input
              type="password"
              class="popup__input"
              id="loginPassword"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" class="popup__btn" id="loginBtn" data-action='signup'>
            Sign-in
          </button>
        </form>
        <button type="button" data-action="popup__close" class="popup__close-btn">
          <i class="fa fa-window-close" data-action="popup__close" aria-hidden="true"></i>
        </button>
      </div>
  `

  return popupWrapper
}

// create popup function, login popup initialization
function createSignup() {
  const popupWrapper = document.createElement('div')
  popupWrapper.classList.add('popup')
  popupWrapper.id = 'signup'
  popupWrapper.dataset.popup = 'signup'

  popupWrapper.innerHTML = `
  <div class="popup__inner">
    <h2 class="popup__title">Sign-up</h2>
    <form class="form popup__form" id="signupForm">
      <div class="popup__input-wrapper">
        <label for="signupEmail" class="popup_label">Email:</label
        ><input
          type="text"
          class="popup__input"
          id="signupEmail"
          placeholder="Enter your email"
          />
      </div>
      <div class="popup__input-wrapper">
        <label for="signupFn" class="popup_label">First name:</label
        ><input
          type="text"
          class="popup__input"
          id="signupFn"
          placeholder="Enter your first name"
        />
      </div>
      <div class="popup__input-wrapper">
        <label for="signupLn" class="popup_label">Last name:</label
        ><input
          type="text"
          class="popup__input"
          id="signupLn"
          placeholder="Enter your last name"
        />
      </div>
      <div class="popup__input-wrapper">
        <label for="signupName" class="popup_label">Username:</label
        ><input
          type="text"
          class="popup__input"
          id="signupName"
          placeholder="Enter your username"
        />
      </div>
      <div class="popup__input-wrapper">
        <label for="signupPassword" class="popup_label">Password:</label
        ><input
          type="password"
          class="popup__input"
          id="signupPassword"
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" class="popup__btn" id="signupBtn" data-action='signup'>
        Sign-up
      </button>
    </form>
    <button type="button" data-action="popup__close" class="popup__close-btn">
      <i class="fa fa-window-close" data-action="popup__close" aria-hidden="true"></i>
    </button>
  </div>
  `

  return popupWrapper
}

// destroyer of popup
function destroyPopup() {
  const popup = document.querySelector('[data-popup]')
  popup?.remove()
}

// util function to set timeout on destroyer function
function destroyTimeout(popup) {
  setTimeout(() => {
    destroyPopup(popup)
  }, 3100)
}

// function to hide the background
function setEventOnBackground(popupEl) {
  popupBackground.addEventListener('click', () => {
    popupBackground.style.display = 'none'
    destroyPopup(popupEl)
  })
}

// util function to set styles to popup and background
function setStylesPopup(popupEl, style) {
  popupEl.style.display = style
  popupBackground.style.display = style
}

// popup close btn function
document.addEventListener('click', (e) => {
  const target = e.target
  if (target.dataset.action && target.dataset.action === 'popup__close') {
    const popup = target.closest('[data-popup]')
    setStylesPopup(popup, 'none')
    destroyPopup(popup.id)
  }
})

// common for all submit events
document.addEventListener('submit', (e) => {
  e.preventDefault()
})

// login popup sybmit function
document.addEventListener('submit', async (e) => {
  if (e.target.closest('#loginForm')) {
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

      savingIntoLS('profileData', minimalizeObject(foundUser))

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

// function for checking if input is empty
document.addEventListener('change', (e) => {
  const input = e.target
  if (input === signupEmail) {
    if (validateEmail(input.value)) {
      input.style.border = '1px solid #191847'
      signupBtn.disabled = false
    } else {
      input.style.border = '1px solid red'
      signupBtn.disabled = true
    }
  }
})

// function for disable a submit btn whether one of the fields is empty or not
document.addEventListener('focusout', (e) => {
  const input = e.target
  const ifStatement = input.classList.contains('popup__input')

  if (ifStatement && input.value.length > 0) {
    const btn = input.closest('.popup__form').querySelector('[data-action]')
    input.style.border = '1px solid #191847'
    btn.disabled = false
  }

  if (ifStatement && !input.value.length) {
    const btn = input.closest('.popup__form').querySelector('[data-action]')
    input.style.border = '1px solid red'
    btn.disabled = true
  }
})

// signup popup sybmit function
document.addEventListener('submit', async (e) => {
  const signupForm = e.target.closest('#signupForm')

  if (signupForm) {
    const signupPopup = signupForm.closest('#signup')
    const creationObj = {
      firstName: signupFn.value,
      lastName: signupLn.value,
      email: signupEmail.value,
      username: signupName.value,
      password: signupPassword.value,
      image: DEFAULT_IMAGE,
    }

    const newUser = await addNewUser(creationObj)

    console.log(newUser)
    showResultPopupMessage(
      signupPopup,
      'success__result-message',
      `Welcome, ${newUser.username}!<br> We're glad to see you here!`
    )

    savingIntoLS('profileData', newUser)
    loadingFromLS()
    destroyTimeout(signupPopup.id)
  }
})

// fetch function to add new user
async function addNewUser(newUser) {
  const url = 'https://dummyjson.com/users/add'
  const settings = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  }

  try {
    const fetchResponse = await fetch(url, settings)
    const data = await fetchResponse.json()
    return data
  } catch (e) {
    return e
  }
}

// util validate function for email
function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

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
    image: oldObj.image,
    firstName: oldObj.firstName,
    lastName: oldObj.lastName,
  }
}

// function to save data into LocalStorage
function savingIntoLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

// function to load data from LocalStorage
function loadingFromLS() {
  profileObj = JSON.parse(localStorage.getItem('profileData'))
  if (!profileObj) {
    return
  } else {
    authorizationList.style.display = 'none'
    profileHeader.style.display = 'flex'
    profileHeaderImage.src = profileObj.image
    profileHeaderName.innerText = `${profileObj.firstName} ${profileObj.lastName}`
  }
}

// function to delete data from LocalStorage
function deleteFromLS() {
  localStorage.removeItem('profileData')
}

// timeout function to signout from an account
signOutBtn.addEventListener('click', () => {
  setTimeout(() => {
    setDisplay(profileHeader, 'none')
    setDisplay(authorizationList, 'flex')
    deleteFromLS()
  }, 500)
})

// util function to set new value to display rule
function setDisplay(el, value) {
  el.style.display = value
}

// util function to clean content of specified container
function cleanContent(container) {
  container.innerHTML = ''
}

// 9uQFF1Lh
