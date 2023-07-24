import { popupBackground } from './requiredElements.js'

// function of message rendering
export function renderMessage(classPar, messagePar, container) {
  const message = document.createElement('p')
  message.classList.add(classPar)

  message.innerHTML = messagePar
  container.appendChild(message)
}

// util function to replacing dashes with white spaces
export function replacingDashes(text, replacingEl = ' ') {
  return text.replace(/-/g, replacingEl)
}

// function to set styles to popup and background
export function setStylesPopup(popupEl, style) {
  popupEl.style.display = style
  popupBackground.style.display = style
}

// util function to  set timeout to popup hidding
function popupTimeout(popup) {
  setTimeout(() => {
    setStylesPopup(popup, 'none')
  }, 3000)
}

// util function to show final messages of the working with popup
export function showResultPopupMessage(popupEl, messageClass, messageText) {
  cleanContent(popupEl)
  renderMessage(messageClass, messageText, popupEl)
  popupTimeout(popupEl)
}

// util function to remove unnecessary fields of object
export function minimalizeObject(oldObj) {
  return {
    username: oldObj.username,
    password: oldObj.password,
    image: oldObj.image,
    firstName: oldObj.firstName,
    lastName: oldObj.lastName,
  }
}

// util function to set new value to display rule
export function setDisplay(el, value) {
  el.style.display = value
}

// util validate function for email
export function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

// util function to clean content of specified container
export function cleanContent(container) {
  container.innerHTML = ''
}
