const express = require("express");
const router = express.Router();
const {getAccessToRoute} = require("../middlewares/auth");
const {me} = require("../controllers/user");

router.get("/me",getAccessToRoute, me);


module.exports = router;