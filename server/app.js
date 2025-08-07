const express = require('express');
const cors = require('cors');
const cafe24Router = require('./routes/cafe24');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/cafe24', cafe24Router);

module.exports = app;
