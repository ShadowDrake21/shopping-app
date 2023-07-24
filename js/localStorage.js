import {
  authorizationList,
  profileHeader,
  profileHeaderImage,
  profileHeaderName,
} from './requiredElements.js'

let profileObj = {}

// function to save data into LocalStorage
export function savingIntoLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

// function to load data from LocalStorage
export function loadingFromLS() {
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
export function deleteFromLS() {
  localStorage.removeItem('profileData')
}
