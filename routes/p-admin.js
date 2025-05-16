const express = require("express");
const tagsController = require("./../controllers/p-admin/tags");
const authGuard = require("../middlewares/authGuard");


const router = express.Router();


router
    .route('/tags')
    .get(authGuard, tagsController.showTagsManage);

module.exports = router;