// test.js
const axios = require('axios');

axios.get('https://api.github.com')
    .then(response => {
        console.log('Data:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

