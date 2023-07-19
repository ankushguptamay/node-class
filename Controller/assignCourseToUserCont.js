const db = require('../Model');
const Course = db.course;
const User = db.user;
const CourseDocument = db.courseDocument;
const User_Course = db.user_Course;

exports.assignCourseToUser = async (req, res) => {
    try {
        const { courseId, userId } = req.body;
        await User_Course.create({
            courseId: courseId,
            userId: userId
        });
        res.send({
            success: true,
            message: "Course Assign to user successfully!"
        });
    } catch (e) {
        console.log(e);
        res.send({
            success: false,
            message: e
        });
    }
}

exports.getCourseDocumentForUser = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.user.id;
        const isAssign = await User_Course.findOne({
            where: {
                courseId: courseId,
                userId: userId
            }
        });
        if (!isAssign) {
            return res.status(400).send({
                success: false,
                message: "Purchase this course!"
            });
        }
        const course = await Course.findOne({
            where: {
                id: courseId
            },
            include: [{
                model: CourseDocument,
                as: "courseDocument"
            }]
        });
        res.status(200).send({
            success: true,
            message: "Course fetched successfully!",
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

exports.getUsersCourse = async (req, res) => {
    try {
        const userId = req.user.id;
        const usersCourse = await User.findOne({
            where: {
                id: userId
            },
            include: [{
                model: Course,
                as: "course"
            }]
        });
        res.status(200).send({
            success: true,
            message: "Course fetched successfully!",
            data: usersCourse
        });
    } catch (e) {
        console.log(e);
        res.send({
            success: false,
            message: e
        });
    }
}