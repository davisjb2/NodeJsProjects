console.log("Client side javascript file is loaded");

const weatherFrom = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = 'Loading...'

weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value
    
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.summary + " It is currently " + data.temperature + " degrees outside. The high today is " + data.high + " with a low of " + data.low + ". There is a " + data.precip + "% chance of rain."
            }
        })
    })
});