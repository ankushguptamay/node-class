const { registerAdmin, loginAdmin, getAdmin, getAdminByToken, updateAdmin, deleteAdmin } = require('../Controller/ crudController');
const { addCourse, getCourse, getAdminCourse, addCourseDocument } = require('../Controller/courseController');
const express = require('express');

// middleware
const uploadImage = require('../Middleware/uploadFile');
const { verifyAdminToken } = require('../Middleware/validateJWT')

const route = express.Router();

route.post('/registerAdmin', registerAdmin);
route.post('/loginAdmin', loginAdmin);
route.get('/getAdmin', getAdmin);
route.get('/getAdminByToken', verifyAdminToken, getAdminByToken);
route.put('/updateAdmin/:id', updateAdmin);
route.delete('/deleteAdmin/:id', deleteAdmin);

route.post('/addCourse', verifyAdminToken, uploadImage.single('thumbNail'), addCourse);
route.get('/getCourse', verifyAdminToken, getCourse);
route.get('/getAdminCourse', verifyAdminToken, getAdminCourse);
route.post('/addCourseDocument/:courseId', verifyAdminToken, uploadImage.array('document', 10), addCourseDocument);

module.exports = route;