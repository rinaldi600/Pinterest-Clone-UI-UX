const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    fileNameOriginal : {
        type : String,
        required: [true, 'File nama wajib diisi']
    },
    filePath: {
        type: String,
        required: [true, 'File path wajib diisi']
    },
    fileType : {
        type: String,
        required: [true, 'File tipe wajib diisi']
    },
    fileSize : {
        type : Number,
        required: [true, 'File size wajib diisi']
    },
}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
});

const uploadModel = mongoose.model('Image', uploadSchema);

module.exports = {
  uploadModel,
};