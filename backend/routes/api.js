const express = require("express");
const fs = require('fs');
const router = express.Router();
const multer = require('multer');
const {upload} = require('../config/filehelper');
const {uploadModel} = require('../models/uploadSchema');
const {singleUploadFile} = require('../controllers/fileController');

router.route('/').get(async (req, res) => {
    const getAllData = await uploadModel.find({});
    res.send(getAllData);
});
router.post('/upload', upload.single("photo"), singleUploadFile);
router.delete('/images/:id',  async (req, res) => {
    try {
        const data = await uploadModel.findById(req.params.id).exec();
        try {
            uploadModel.deleteOne({_id : req.params.id})
                .then((success) => {
                    fs.unlinkSync(data.filePath);
                    res.send("Data Successfully Deleted");
                })
                .catch((error) => {
                    res.send(error)
                });
        } catch (e) {
            res.send("File Server Error");
        }
    } catch (e) {
        res.send("Data Not Found");
    }
});

module.exports = {
    router,
};