const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const {router} = require('./routes/api');
const conn = mongoose.connection;
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/upload', {useNewUrlParser: true});

conn.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

app.use('/file', router);
app.use('/uploads', express.static(__dirname + '/uploads/'));
app.listen(port, function() {
    console.log("Server is running on Port: " + port);
});
