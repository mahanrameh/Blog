const express = require("express");
const path = require("path");
const multer = require("multer");
const articleController = require("./../controllers/articleController");
const authGuard = require("./../middlewares/authGuard");


const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../public/images/cover'));
    },
    filename: (req, file, cb) => {
        const filename = `
        ${file.originalname}-
        ${Date.now()}
        ${path.extname(file.originalname)}`;
        cb(null, filename);
    }
});


const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extName) {
        return cb(null, true);
    }

    return cb(new Error('can not support file type'));
};

const uploader = multer({
    storage,
    fileFilter,
    limits: {fileSize: 3 * 1024 * 1024}
});






router
    .route('/')
    .get(articleController.getAll)
    .post(
        authGuard,
        uploader.single('cover'), 
        articleController.create);


router
    .route('/:slug')
    .get(articleController.getBySlug);


router
    .route('/remove/:id')
    .post(articleController.deleteArticle);






module.exports = router;