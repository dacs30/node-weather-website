console.log('Client side javascript file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const firstMessage = document.querySelector('#firstMessage');
const secondMessage = document.querySelector('#secondMessage');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    firstMessage.textContent = "Loading...";
    secondMessage.textContent = "";
    
    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            firstMessage.textContent = data.error;
        } else {
            firstMessage.textContent = data.location;
            secondMessage.textContent = data.forecast;
            }
        })
    })

})