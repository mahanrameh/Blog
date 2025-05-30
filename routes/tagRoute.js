const express = require("express");
const tagController = require("./../controllers/tagController");
const authGuard = require("../middlewares/authGuard");


const router = express.Router();


router
    .route('/')
    .get(tagController.getAll)
    .post(tagController.create);


router
    .route('/:slug')
    .get(tagController.findTagArticle);
    

router
    .route('/update')
    .post(authGuard, tagController.update);


// because of ejs delete route wroted with post method
router
    .route('/remove/:id')
    .post(authGuard, tagController.delete);









module.exports = router;