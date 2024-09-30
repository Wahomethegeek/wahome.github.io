// api/contact.js
import axios from 'axios';

// Exporting the handler function for Vercel
export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Extracting form data from the request body
        const { name, email, phone, message } = req.body;

        // Use the API key from the environment variable set in Vercel
        const apiKey = process.env.API_KEY; // No need for dotenv here

        // Prepare data for the API request
        const formData = {
            access_key: apiKey,
            name,
            email,
            phone,
            message,
        };

        try {
            // Sending the data to Web3Forms API
            const response = await axios.post('https://api.web3forms.com/submit', formData);

            // Check if the response is successful
            if (response.data.success) {
                // Redirect to success page if the submission was successful
                res.redirect('/success.html');
            } else {
                // Handle API error
                res.status(400).json({ error: response.data.message });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error submitting form' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
