require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // For parsing form data
const axios = require('axios'); // To make HTTP requests
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Route for the main page (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for the form success page
app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'success.html'));
});

// Handle form submissions
app.post('/contact', async (req, res) => {
    try {
        // Extract form data
        const { name, email, phone, message } = req.body;

        // Use the API key from the environment variable
        const apiKey = process.env.API_KEY;

        // Prepare data for the API request
        const formData = {
            access_key: apiKey,
            name,
            email,
            phone,
            message
        };

        // Send the data to Web3Forms API
        const response = await axios.post('https://api.web3forms.com/submit', formData);

        // Check if the response is successful
        if (response.data.success) {
            // Redirect to success page if the submission was successful
            res.redirect('/success');
        } else {
            // Handle API error
            res.status(400).send('Error submitting form: ' + response.data.message);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error submitting form');
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server running on port 3000');
  // console.log('process.env.API_KEY', process.env.API_KEY);
 
});
