const express = require("express");
const tagsController = require("./../controllers/p-admin/tags");
const authGuard = require("../middlewares/authGuard");
const roleGuard = require("../middlewares/roleGuard");


const router = express.Router();


router
    .route('/tags')
    .get(authGuard, roleGuard('admin'), tagsController.showTagsManage);


router
    .route('/create-article')
    .get(authGuard, tagsController.showCreateArticle);





module.exports = router;