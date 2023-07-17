require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const crud = require('./Route/route');
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

app.use('/api', crud);

app.use("/", (req, res) => {
    res.send("<h1>hello!</h1>");
})
// console.log(process);
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});