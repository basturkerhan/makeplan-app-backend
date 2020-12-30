const asyncHandler = require("express-async-handler")
const List = require("../models/List")
const CustomError = require("../helpers/errors/CustomError")
const Card = require("../models/Card")
const Board = require("../models/Board")

const createCard = asyncHandler(async(req,res)=>{
    const list = await List.findById(req.params.list_id);
    const infos = req.body;
    const card = await Card.create({
        ...infos,
        index: list.cards.length,
        followers: [],
        ownerList: list._id
    })
    list.cards.push(card);
    await list.save();

    res.json({
        data:card
    })
})

const deleteList = asyncHandler(async(req,res,next)=>{
    let list = await List.findById(req.params.list_id)
    if(!list) return next(new CustomError("Böyle bir liste bulunamadı",400))

    let board = await req.board
    let index = board.lists.indexOf(list._id)
    board.lists.splice(index, 1)
    await list.remove()
    await board.save()

    res.json({
        status: true
    })
})

const renameList = asyncHandler(async(req,res,next)=>{
    const list = await List.findById(req.params.list_id)
    if(!list) return next(new CustomError("Böyle bir liste bulunamadı"))
    list.title = req.body.title
    await list.save()
    res.json({
        status: true
    })
})

module.exports = {
    deleteList,
    createCard,
    renameList
}