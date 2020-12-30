const express = require("express");
const { addFollower, updateCard, deleteCardFollower, changeImage } = require("../controllers/cards");

const router = express.Router();
router.post("/:card_id/addfollower", addFollower);
router.post("/:card_id/update", updateCard);
router.post("/:card_id/delete-follower", deleteCardFollower);
router.post("/:card_id/change-image", changeImage);

module.exports = router;