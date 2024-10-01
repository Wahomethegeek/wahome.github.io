const axios = require('axios');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { name, email, phone, message } = req.body;
            const apiKey = process.env.API_KEY;

            if (!apiKey) {
                console.error('API_KEY is not defined');
                return res.status(500).json({ error: 'API_KEY is not defined' });
            }

            const formData = {
                access_key: apiKey,
                name,
                email,
                phone,
                message,
            };

            const response = await axios.post('https://api.web3forms.com/submit', formData);

            if (response.data.success) {
                // Redirect to a success page
                return res.redirect('/success');
            } else {
                return res.status(400).send('Error submitting form: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error occurred during form submission:', error);
            return res.status(500).json({ error: 'Error submitting form' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};



