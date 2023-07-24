import { SEARCH_FRAGMENT, USERS_API } from './constants.js'
import { createUserWrapper } from './createElements.js'
import { title, usersContainer, usersForm } from './requiredElements.js'
import { cleanContent, renderMessage } from './util.js'

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

// function to create user block
export function createUserEl(user) {
  const id = user.id

  const userWrapper = document.createElement('div')
  userWrapper.classList.add('user__item')
  userWrapper.id = `user${id}`

  userWrapper.innerHTML = createUserWrapper(user)
  return userWrapper
}
