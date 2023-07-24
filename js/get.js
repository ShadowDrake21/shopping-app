import { API_URL, LIMIT_FRAGMENT, USERS_API } from './constants.js'
import { renderAllCategories, renderUsers } from './render.js'

// function with fetch query, get all categories
export async function getAllCategories() {
  const categories = await fetch(API_URL + 'categories').then((res) =>
    res.json()
  )
  renderAllCategories(categories)
}

// util function to get all users and render them
export async function getAllUsers() {
  const allUsers = await fetchAllUsers()
  renderUsers(allUsers.users)
}

// fetch function to get all users
export async function fetchAllUsers() {
  const allUsers = await fetch(USERS_API + LIMIT_FRAGMENT + 30).then((res) =>
    res.json()
  )
  return allUsers
}

// fetch function to add new user
export async function addNewUser(newUser) {
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
