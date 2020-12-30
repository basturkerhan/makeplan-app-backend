const express = require("express");
const router = express.Router();
const {getAccessToRoute} = require("../middlewares/auth");

const auth = require("./auth");
const user = require("./user");
const board = require("./board");
const cards = require("./cards");

router.use("/auth", auth);

router.use([getAccessToRoute]);
router.use("/users", user);
router.use("/boards", board);
router.use("/cards", cards);

module.exports =  router;