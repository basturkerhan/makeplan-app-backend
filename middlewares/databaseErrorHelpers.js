const asyncHandler = require("express-async-handler");
const Board = require("../models/Board");
const User = require("../models/User");
const CustomError = require("../helpers/errors/CustomError");

const checkBoardExist = asyncHandler(async (req,res,next)=>{
    let board = Board.findOne({_id: req.params.id}); 
    if(!board){
        return next( new CustomError("Böyle bir pano bulunmadı",400));
    }
    req.board = board;
    next();
})

const checkIsBoardMember = asyncHandler(async (req,res,next)=>{
    let board = await req.board;
    let member = await User.findOne({ _id: req.user.id });
    if(!board.members.includes(member._id))
        return next( new CustomError("Bu panonun bir üyesi değilsiniz",400));
    req.member = member;
    next();
})

const checkBoardOwner = asyncHandler(async(req,res,next)=>{
    let board = await req.board;
    let user = req.member;
    if( String(user._id) !== String(board.owner._id) )
        return next(new CustomError("Bu işlemi sadece pano sahibi yapabilir", 400));
    next();
})

module.exports  = {
    checkBoardExist,
    checkIsBoardMember,
    checkBoardOwner
}