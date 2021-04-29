require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
    mongoose.connect('mongodb://localhost/TEST_YazawaNico', { useNewUrlParser: true });
}
mongoose.connect('mongodb://localhost/YazawaNico', { useNewUrlParser: true });

const app = express();

app.use(cors());

// Middlewares moved morgan into if for clear tests
// if (!process.env.NODE_ENV === 'test') {
//     app.use(morgan('combined'));
// }
app.use(morgan('combined'))

app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));
app.use('/guilds', require('./routes/guilds'));
app.use('/globals', require('./routes/globals'));
app.use('/api/discord', require('./routes/discord'));

module.exports = app;