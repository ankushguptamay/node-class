const { registerAdmin, loginAdmin, getAdmin, getAdminByToken, updateAdmin, deleteAdmin } = require('../Controller/ crudController');
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

module.exports = route;