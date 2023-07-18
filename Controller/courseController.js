const db = require('../Model');
const Course = db.course;
const Admin = db.admin;
const CourseDocument = db.courseDocument;
const { addCourse } = require('../Middleware/validate')

exports.addCourse = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: "Secect One thumbnail!"
            });
        }
        const { error } = addCourse(req.body); exports.addCourse = async (req, res) => {
            try {
                if (!req.file) {
                    return res.status(400).send({
                        success: false,
                        message: "Secect One thumbnail!"
                    });
                }
                const { error } = addCourse(req.body);
                if (error) {
                    console.log(error);
                    return res.status(400).send(error.details[0].message)
                }
                console.log(req.file);
                const adminId = req.admin.id;
                const { name, title, price } = req.body;
                await Course.create({
                    name: name,
                    title: title,
                    price: price,
                    adminId: adminId,
                    thumbNail: req.file.path
                });
                res.send({
                    success: true,
                    message: "Course Added successfully!"
                });
            } catch (e) {
                console.log(e);
                res.send({
                    success: false,
                    message: e
                });
            }
        }
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message)
        }
        console.log(req.file);
        const adminId = req.admin.id;
        const { name, title, price } = req.body;
        await Course.create({
            name: name,
            title: title,
            price: price,
            adminId: adminId,
            thumbNail: req.file.path
        });
        res.send({
            success: true,
            message: "Course Added successfully!"
        });
    } catch (e) {
        console.log(e);
        res.send({
            success: false,
            message: e
        });
    }
}

exports.getCourse = async (req, res) => {
    try {
        const id = req.admin.id;
        const course = await Admin.findAll({
            where: { id: id },
            attributes: { exclude: ['password'] },

            include: [{
                model: Course,
                as: "adminCourse",
                include: [{
                    model: CourseDocument,
                    as: 'courseDocument',
                }]
            }]
        });
        res.send({
            success: true,
            message: "Admin Course fetched!",
            data: course
        });
    } catch (e) {
        console.log(e);
        res.send({
            success: false,
            message: e
        });
    }
}

exports.getAdminCourse = async (req, res) => {
    try {
        const course = await Course.findAll({
            include: [{
                model: Admin,
                as: "publisher",
                attributes: { exclude: ['password'] }
            }]
        });
        res.send({
            success: true,
            message: "Admin Course fetched!",
            data: course
        });
    } catch (e) {
        console.log(e);
        res.send({
            success: false,
            message: e
        });
    }
}

exports.addCourseDocument = async (req, res) => {
    try {
        if (req.files <= 0) {
            return res.status(400).send({
                success: false,
                message: "Secect atleast One file!"
            });
        }
        const adminId = req.admin.id;
        const courseId = req.params.courseId;
        const fileArray = (req.files).map((file) => { return file.path });
        for (let i = 0; i < fileArray.length; i++) {
            await CourseDocument.create({
                document: fileArray[i],
                courseId: courseId,
                adminId: adminId
            })
        }
        res.send({
            success: true,
            message: "Document Added successfully!"
        });
    } catch (e) {
        console.log(e);
        res.send({
            success: false,
            message: e
        });
    }
}