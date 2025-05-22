const express = require("express");
const tagsController = require("./../controllers/p-admin/tags");
const authGuard = require("../middlewares/authGuard");


const router = express.Router();


router
    .route('/tags')
    .get(authGuard, tagsController.showTagsManage);


router
    .route('/create-article')
    .get(authGuard, tagsController.showCreateArticle);





module.exports = router;