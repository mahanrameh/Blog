const express = require("express");
const homeController = require("./../controllers/homeController");
const homeAuth = require("./../middlewares/homeAuth");


const router = express.Router();


router
    .route('/')
    .get(homeAuth, homeController.home);


router
    .route('/search')
    .get(homeAuth, homeController.search);





module.exports = router;