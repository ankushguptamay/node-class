const { Op } = require('sequelize');
const db = require('../Model');
const { validateRegistration, validateLogin } = require('../Middleware/validate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = db.user;

const SALT = 10;

exports.registerUser = async (req, res) => {
    try {
        // validate body
        const { error } = validateRegistration(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message)
        }
        const { name, email, mobileNumber, password } = req.body;

        const isUser = await User.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                    { mobileNumber: mobileNumber }
                ]
            }
        });
        if (isUser) {
            return res.status(400).send({
                success: false,
                message: "This email or mobile number is already present!"
            });
        }
        const bcryptPassword = await bcrypt.hash(password, SALT);
        const user = await User.create({
            name: name,
            email: email,
            mobileNumber: mobileNumber,
            password: bcryptPassword
        });
        const data = {
            id: user.id,
            email: email
        };
        const authToken = jwt.sign(
            data,
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_VALIDITY }
        );
        res.status(201).send({
            success: true,
            message: "User Registered!",
            data: {
                name: name,
                email: email,
                authToken: authToken
            }
        });
    } catch (e) {
        console.log(e);
        res.send({
            success: false,
            message: e
        });
    }
}

exports.loginUser = async (req, res) => {
    try {
        // validate body
        const { error } = validateLogin(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message)
        }
        const { email, password } = req.body;

        const user = await User.findOne({
            where:
                { email: email }
        });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "This email is not present! Are you register?"
            });
        }
        const validatePassword = await bcrypt.compare(
            password,
            user.password
        );
        if (!validatePassword) {
            return res.status(400).send({
                success: false,
                message: "Wrong password!"
            });
        }
        const data = {
            id: user.id,
            email: email
        };
        const authToken = jwt.sign(
            data,
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_VALIDITY }
        );
        res.status(200).send({
            success: true,
            message: "User Loged In!",
            data: {
                name: user.name,
                email: email,
                authToken: authToken
            }
        });
    } catch (e) {
        console.log(e);
        res.send({
            success: false,
            message: e
        });
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const user = await User.findAll();
        res.send({
            success: true,
            message: "User fetched!",
            data: User
        });
    } catch (e) {
        console.log(e);
        res.send({
            success: false,
            message: e
        });
    }
}

exports.getUserByToken = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findOne({
            where: { id: id },
            attributes: { exclude: ['password'] }
        });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User is not present!"
            });
        }
        res.send({
            success: true,
            message: "User Fetched!",
            data: user
        });
    } catch (e) {
        console.log(e);
        res.send({
            success: false,
            message: e
        });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { id: req.user.id }
        });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User is not present!"
            });
        }
        const { name } = req.body;
        await user.update({
            name: name
        })
        res.send({
            success: true,
            message: "User updated!"
        });
    } catch (e) {
        console.log(e);
        res.send({
            success: false,
            message: e
        });
    }
}