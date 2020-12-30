const express = require("express");
const router = express.Router();
const {createNewBoard, getBoard, deleteMember, deleteBoard, createList, handleEvent, renameBoard, inviteMember, changeBackground, unfollowBoard} = require("../controllers/board");
const {checkBoardExist, checkIsBoardMember, checkBoardOwner} = require("../middlewares/databaseErrorHelpers");
const list = require("./list");

router.post("/new", createNewBoard);
router.use("/:id/lists", checkBoardExist, list);
router.use("/:id", [checkBoardExist, checkIsBoardMember]);
router.get("/:id", getBoard);
router.post("/:id/createlist", createList);
router.get("/:id/delete", checkBoardOwner, deleteBoard);
router.post("/:id/rename", checkBoardOwner, renameBoard);
router.get("/:id/event", handleEvent);
router.post("/:id/invite", checkBoardOwner, inviteMember);
router.post("/:id/delete-member", checkBoardOwner, deleteMember);
router.post("/:id/change-background", changeBackground);
router.get("/:id/unfollow", unfollowBoard);

module.exports = router;