const { Op } = require('sequelize');
const db = require('../Model');
const Admin = db.admin;

exports.isAdminPresent = async (req, res, next) => {
    try {
        const admin = await Admin.findOne({
            where: {
                [Op.and]: [
                    { id: req.admin.id },
                    { email: req.admin.email }
                ]
            }
        });
        if (!admin) {
            return res.status(400).send({
                success: false,
                message: "Admin is not present!"
            });
        }
        next();
    } catch (e) {
        console.log(e);
        res.send({
            success: false,
            message: e
        });
    }
}