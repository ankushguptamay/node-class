require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const admin = require('./Route/admin');
const user = require('./Route/user');
const db = require('./Model')

// sync with database
db.sequelize.sync()
    .then(() => {
        console.log("Database synced!");
    })
    .catch((err) => {
        console.log(err);
    });

// built-in middleware for handle url encoded form data
app.use(bodyParser.urlencoded({ extended: false }));
// built-in middleware for json
app.use(bodyParser.json());

// route
app.use('/api/admin', admin);
app.use('/api/user', user);

app.use("/", (req, res) => {
    res.send("hello!");
});

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});