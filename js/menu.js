import { getAllCategories, getAllUsers } from './get.js'
import { menuList } from './requiredElements.js'

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
