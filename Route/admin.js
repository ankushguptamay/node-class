const { registerAdmin, loginAdmin, getAdmin, getAdminByToken, updateAdmin, deleteAdmin } = require('../Controller/adminController');
const { addCourse, getAdminCourse, addCourseDocument, getCourseDocumentForAdmin } = require('../Controller/courseController');
const { assignCourseToUser } = require('../Controller/assignCourseToUserCont');
const express = require('express');

// middleware
const uploadFile = require('../Middleware/uploadFile');
const { verifyAdminToken } = require('../Middleware/validateJWT');
const { isAdminPresent } = require('../Middleware/isPresent');

const admin = express.Router();

admin.post('/registerAdmin', registerAdmin);
admin.post('/loginAdmin', loginAdmin);
admin.get('/getAdmin', getAdmin);
admin.get('/getAdminByToken', verifyAdminToken, getAdminByToken);
admin.put('/updateAdmin', verifyAdminToken, updateAdmin);
// admin.delete('/deleteAdmin', deleteAdmin);

admin.post('/addCourse', verifyAdminToken, isAdminPresent, uploadFile.single('thumbNail'), addCourse);
admin.get('/getAdminCourse', verifyAdminToken, isAdminPresent, getAdminCourse);
admin.post('/addCourseDocument/:courseId', verifyAdminToken, isAdminPresent, uploadFile.array('document', 10), addCourseDocument);
admin.get('/getCourseDocumentForAdmin/:courseId', verifyAdminToken, isAdminPresent, getCourseDocumentForAdmin);

admin.post('/assignCourseToUser', verifyAdminToken, isAdminPresent, assignCourseToUser);

module.exports = admin;