const asyncHandler = require("express-async-handler");
const List = require("../models/List");
const CustomError = require("../helpers/errors/CustomError");
const Card = require("../models/Card");

const deleteCard = asyncHandler(async(req,res,next)=>{
    const list = await List.findById(req.params.list_id);
    if(!list)
        return next(new CustomError("Böyle bir liste yok",400))
    const card = await Card.findById(req.params.card_id);
    await card.remove();
    list.cards.splice( req.params.card_id, 1);
    await list.save();

    res.json({
        status: true
    })
})


module.exports = {
    deleteCard
}