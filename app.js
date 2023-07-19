require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const admin = require('./Route/admin');
const user = require('./Route/user');
const db = require('./Model')

db.sequelize.sync()
    .then(() => {
        console.log("Database synced!");
    })
    .catch((err) => {
        console.log(err);
    })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/admin', admin);
app.use('/api/user', user);

app.use("/", (req, res) => {
    res.send("<h1>hello!</h1>");
})
// console.log(process);
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});