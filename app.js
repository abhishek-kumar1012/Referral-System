const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/users', require('./routes/userRoutes.js'));
app.use('/api/earnings', require('./routes/earningsRoutes'));

module.exports = app;
