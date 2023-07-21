const fs = require('fs');

const deleteSingleFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            throw (err);
        }
    })
}

const deleteMultiFile = (filePath) => {
    for (let i = 0; i < filePath.length; i++) {
        fs.unlink(filePath[i], (err) => {
            if (err) {
                throw (err);
            }
        });
    }
}

module.exports = {
    deleteSingleFile: deleteSingleFile,
    deleteMultiFile: deleteMultiFile
}