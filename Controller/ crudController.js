const { Op } = require('sequelize');
const db = require('../Model');
const { validateRegistration, validateLogin } = require('../Middleware/validate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = db.admin;

const SALT = 10;

exports.registerAdmin = async (req, res) => {
    try {
        // validate body
        const { error } = validateRegistration(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message)
        }
        const { name, email, mobileNumber, password } = req.body;

        const isAdmin = await Admin.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                    { mobileNumber: mobileNumber }
                ]
            }
        });
        if (isAdmin) {
            return res.status(400).send({
                success: false,
                message: "This email or mobile number is already present!"
            });
        }
        const bcryptPassword = await bcrypt.hash(password, SALT);
        const admin = await Admin.create({
            name: name,
            email: email,
            mobileNumber: mobileNumber,
            password: bcryptPassword
        });
        const data = {
            id: admin.id,
            email: email
        };
        const authToken = jwt.sign(
            data,
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_VALIDITY }
        );
        res.status(201).send({
            success: true,
            message: "Admin Registered!",
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

exports.loginAdmin = async (req, res) => {
    try {
        // validate body
        const { error } = validateLogin(req.body);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message)
        }
        const { email, password } = req.body;

        const admin = await Admin.findOne({
            where:
                { email: email }
        });
        if (!admin) {
            return res.status(400).send({
                success: false,
                message: "This email is not present! Are you register?"
            });
        }
        const validatePassword = await bcrypt.compare(
            password,
            admin.password
        );
        if (!validatePassword) {
            return res.status(400).send({
                success: false,
                message: "Wrong password!"
            });
        }
        const data = {
            id: admin.id,
            email: admin.email
        };
        const authToken = jwt.sign(
            data,
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_VALIDITY }
        );
        res.status(200).send({
            success: true,
            message: "Admin Loged In!",
            data: {
                name: admin.name,
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

// for admin
exports.getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findAll();
        res.send({
            success: true,
            message: "admin fetched!",
            data: admin
        });
    } catch (e) {
        console.log(e);
        res.send({
            success: false,
            message: e
        });
    }
}

exports.getAdminByToken = async (req, res) => {
    try {
        const id = req.admin.id;
        const admin = await Admin.findOne({
            where: { id: id },
            attributes: { exclude: ['password'] }
        });
        if (!admin) {
            return res.status(400).send({
                success: false,
                message: "admin is not present!"
            });
        }
        res.send({
            success: true,
            message: "admin Created!",
            data: admin
        });
    } catch (e) {
        console.log(e);
        res.send({
            success: false,
            message: e
        });
    }
}

exports.updateAdmin = async (req, res) => {
    try {
        const admin = await Admin.findOne({
            where: { id: req.params.id }
        });
        if (!admin) {
            return res.status(400).send({
                success: false,
                message: "admin is not present!"
            });
        }
        const { name, email, mobileNumber } = req.body;
        await admin.update({
            name: name,
            email: email,
            MobileNumber: mobileNumber
        })
        res.send({
            success: true,
            message: "admin updated!"
        });
    } catch (e) {
        console.log(e);
        res.send({
            success: false,
            message: e
        });
    }
}

exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findOne({
            where: { id: req.params.id }
        });
        if (!admin) {
            return res.status(400).send({
                success: false,
                message: "admin is not present!"
            });
        }
        await admin.destroy();
        res.send({
            success: true,
            message: "admin destroied!"
        });
    } catch (e) {
        console.log(e);
        res.send({
            success: false,
            message: e
        });
    }
}
