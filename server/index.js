const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// load env variables
dotenv.config({ path: './config/config.env' });

// connect to database
connectDB();

const app = express();

// body parser
app.use(express.json());

// enable CORS
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api', require('./routes/geodata'));

// heroku
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
    });
}

// define port
const PORT = process.env.PORT || 5000;

// run app
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));