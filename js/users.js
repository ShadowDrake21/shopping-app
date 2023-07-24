import { SEARCH_FRAGMENT, USERS_API } from './constants.js'
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
