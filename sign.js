const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const port = 5500; // Adjusted to your desired port

app.use(bodyParser.json());

app.post('/sign-url', (req, res) => {
    try {
        const urlForSignature = req.body.urlForSignature;

        // Replace 'your_api_secret' with your actual API secret
        const apiSecret = 'your_api_secret';

        // Perform the signature using the API secret
        const signature = crypto.createHmac('sha256', apiSecret).update(urlForSignature).digest('hex');

        res.json({ signature });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
