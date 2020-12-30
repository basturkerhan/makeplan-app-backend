const express = require("express");
const router = express.Router({mergeParams: true});
const cards = require("./card");
const {deleteList, createCard, renameList} = require("../controllers/list");
const {checkIsBoardMember} = require("../middlewares/databaseErrorHelpers");

//boards/board_id/lists/list_id/createcard
router.get("/:list_id/delete", checkIsBoardMember, deleteList);
router.post("/:list_id/rename", checkIsBoardMember, renameList);
router.post("/:list_id/createcard", createCard);
router.use("/:list_id/cards", checkIsBoardMember, cards);

module.exports = router;