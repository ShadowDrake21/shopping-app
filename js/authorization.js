import { deleteFromLS } from './localStorage.js'
import {
  createLogin,
  createPopup,
  createSignup,
  setEventOnBackground,
} from './popups.js'
import {
  authorizationList,
  profileHeader,
  signOutBtn,
} from './requiredElements.js'
import { setDisplay, setStylesPopup } from './util.js'

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

// timeout function to signout from an account
signOutBtn.addEventListener('click', () => {
  setTimeout(() => {
    setDisplay(profileHeader, 'none')
    setDisplay(authorizationList, 'flex')
    deleteFromLS()
  }, 500)
})
