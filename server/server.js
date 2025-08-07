const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // 맨 위에서 호출

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/cafe24/token', async (req, res) => {
  const { code } = req.body;

  const CAFE24_CLIENT_ID = process.env.CAFE24_CLIENT_ID;
  const CAFE24_CLIENT_SECRET = process.env.CAFE24_CLIENT_SECRET;
  const CAFE24_REDIRECT_URI = process.env.CAFE24_REDIRECT_URI;
  const CAFE24_MALL_ID = process.env.CAFE24_MALL_ID;

  const base64 = Buffer.from(`${CAFE24_CLIENT_ID}:${CAFE24_CLIENT_SECRET}`).toString('base64');

  try {
    const response = await axios.post(
      `https://${CAFE24_MALL_ID}.cafe24api.com/api/v2/oauth/token`,
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: CAFE24_REDIRECT_URI,
      }),
      {
        headers: {
          Authorization: `Basic ${base64}`,
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }
    );
    console.log(response.data);
    res.json(response.data);

  } catch (err) {
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Cafe24 Node.js server running on port ${PORT}`);
});
