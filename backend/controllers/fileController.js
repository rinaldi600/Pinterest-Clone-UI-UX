const {uploadModel} = require('../models/uploadSchema');

const singleUploadFile = (req, res, next) => {
    try {
        const file = {
            fileNameOriginal : req.file.originalname,
            filePath : req.file.path,
            fileType : req.file.mimetype,
            fileSize : req.file.size,
        };
        const saveImage = new uploadModel(file);
        saveImage.save();
        res.end('File is uploaded');
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    singleUploadFile
};