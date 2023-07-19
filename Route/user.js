const express = require('express');
const { registerUser, loginUser, getAllUser, getUserByToken, updateUser } = require('../Controller/userController');
const { getAllCourses } = require('../Controller/courseController');

// middleware
const { verifyUserToken } = require('../Middleware/validateJWT')

const user = express.Router();

user.post('/registerUser', registerUser);
user.post('/loginUser', loginUser);
user.get('/getUserByToken', verifyUserToken, getUserByToken);
user.put('/updateUser',verifyUserToken, updateUser);

user.get('/getAllCourses',verifyUserToken, getAllCourses);


user.get('/getAllUser', getAllUser);

module.exports = user;