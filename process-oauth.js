const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/process-oauth', async (req, res) => {
    const { code } = req.body;

    try {
        // Exchange the authorization code for an access token
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            client_id: 'YOUR_CLIENT_ID',
            client_secret: 'YOUR_CLIENT_SECRET',
            grant_type: 'authorization_code',
            code,
            redirect_uri: 'https://yourdomain.com/oauth_callback',
        }).toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const accessToken = tokenResponse.data.access_token;
        // Store accessToken securely (e.g., in DynamoDB or another database)
        // Perform any other actions needed (e.g., getting user info)

        res.json({ success: true });
    } catch (error) {
        console.error('OAuth Token Exchange Error:', error);
        res.json({ success: false });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
