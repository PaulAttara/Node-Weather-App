console.log('Client side js file is loaded')

const weatherForm = document.querySelector('form')
const searchBox = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    const searchTerm = searchBox.value

    fetch('http://localhost:3000/weather?address=' + searchTerm).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                msg1.textContent = data.error                
                msg2.textContent = ''

            }
            else {
                msg1.textContent = data.location
                msg2.textContent = data.summary                
            }
        })
    })
})
