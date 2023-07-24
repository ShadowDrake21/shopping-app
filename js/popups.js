import { DEFAULT_IMAGE } from './constants.js'
import { addNewUser, fetchAllUsers } from './get.js'
import { loadingFromLS, savingIntoLS } from './localStorage.js'
import { popupBackground } from './requiredElements.js'
import {
  minimalizeObject,
  setStylesPopup,
  showResultPopupMessage,
  validateEmail,
} from './util.js'

let loginCloseBtn, loginBtn, loginForm, loginName, loginPassword

let signupCloseBtn,
  signupBtn,
  signupForm,
  signupEmail,
  signupFn,
  signupLn,
  signupName,
  signupPassword

// main function of creating popup
export function createPopup(createPopupHTML, popupId) {
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
export function createLogin() {
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
export function createSignup() {
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

// function to set timeout on destroyer function
function destroyTimeout(popup) {
  setTimeout(() => {
    destroyPopup(popup)
  }, 3100)
}

// function to hide the background
export function setEventOnBackground(popupEl) {
  popupBackground.addEventListener('click', () => {
    popupBackground.style.display = 'none'
    destroyPopup(popupEl)
  })
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
