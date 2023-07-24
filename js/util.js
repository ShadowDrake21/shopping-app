// function of message rendering
export function renderMessage(classPar, messagePar, container) {
  const message = document.createElement('p')
  message.classList.add(classPar)

  message.innerHTML = messagePar
  container.appendChild(message)
}

// util function to clean content of specified container
export function cleanContent(container) {
  container.innerHTML = ''
}
