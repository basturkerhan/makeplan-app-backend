const express = require("express");
const router = express.Router({mergeParams: true});
const {deleteCard} = require("../controllers/card");

//boards/board_id/lists/list_id/cards/card_id/deletecard
router.get("/:card_id/delete", deleteCard);

module.exports = router;