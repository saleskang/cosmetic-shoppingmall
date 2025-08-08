const express = require('express');
const axios = require('axios');
const cors = require('cors');
const redis = require('redis');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const redisClient = redis.createClient({
  socket: {
    host: '192.168.0.200',
    port: 6379,
  }
});

// Redis 연결
redisClient.connect()
  .then(() => console.log('✅ Redis 연결 성공'))
  .catch(err => console.error('❌ Redis 연결 실패:', err));

// ✅ access_token 발급 및 Redis 저장
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

    const access_token = response.data.access_token;

    // Redis에 저장
    await redisClient.set('cafe24:access_token', access_token, {
      EX: 60 * 60 * 12, // 12시간
    });

    console.log('✅ access_token 저장 완료');
    res.json(response.data);

  } catch (err) {
    console.error('❌ 토큰 발급 실패:', err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

// ✅ 상품 조회 API (access_token은 Redis에서 불러오기)
app.get('/api/cafe24/products', async (req, res) => {
  const CAFE24_MALL_ID = process.env.CAFE24_MALL_ID;

  try {
    const access_token = await redisClient.get('cafe24:access_token');

    if (!access_token) {
      return res.status(401).json({ error: 'access_token이 없습니다. 먼저 인증을 진행하세요.' });
    }

    const response = await axios.get(
      `https://${CAFE24_MALL_ID}.cafe24api.com/api/v2/admin/products`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error('❌ 상품 조회 실패:', err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

// ✅ 서버 시작
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Cafe24 Node.js 서버 실행 중: http://localhost:${PORT}`);
});
