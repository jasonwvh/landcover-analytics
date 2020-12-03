const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./server/config/db');

// load env variables
dotenv.config({ path: './server/config/config.env' });

// define port
const PORT = process.env.PORT || 5000;

// connect to database
connectDB();

const app = express();

// body parser
app.use(express.json());

// enable CORS
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, '/server/public')));

// routes
app.use('/api', require('./server/routes/geodata'));

// serve static 
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resoolve(__dirname, "client", "build", "index.html"));
    });
}

// run app
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));