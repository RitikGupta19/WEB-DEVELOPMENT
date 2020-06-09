const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');

const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const imageFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpeg|jpg|png|gif)$/)) {
        return cb(new Error("This type of File is not supported"));
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter});

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.status(200);})
.get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, 
    upload.single('imageFile'), (req, res) => {
        res.status = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(req.file); 
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /imageUpload');
})

module.exports = uploadRouter;