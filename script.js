const input = document.querySelector('input')
const sendButton = document.querySelector('.send');
const body = document.querySelector('body')

sendButton.addEventListener('click', () => {
    const text = document.createElement('p')
    text.innerHTML = input.value

    body.appendChild(text)
})
