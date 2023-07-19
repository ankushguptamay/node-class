const path = require("path");
const multer = require("multer");

const filter = (req, file, cb) => {
    if (file.fieldname === "thumbNail") {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        } else {
            cb("Please upload only images.", false);
        }
    } else {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        } else if (file.mimetype.startsWith("application/pdf")) {
            cb(null, true);
        } else {
            cb("Please upload only Image or PDF.", false);
        }
    }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "thumbNail") {
            cb(null, path.join(`${__dirname}/../Resource/ThumbNail`));
        } else if (file.fieldname === "document") {
            cb(null, path.join(`${__dirname}/../Resource/CourseDocument`));
        }
    },
    filename: (req, file, callback) => {
        var filename = `${Date.now()}-${file.originalname}`;
        callback(null, filename);
    }
});
uploadImageOrPDF = multer({ storage: storage, fileFilter: filter });

module.exports = uploadImageOrPDF;