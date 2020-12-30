const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Board = require("../models/Board");

const me = asyncHandler(async(req,res)=>{
    //const user = await User.findOne({ _id: req.user.id })
    let query = User.findOne({_id: req.user.id});

    let populateObject =
        {
            path: "Boards",
            select: "name background"
        }
        query = query.populate(populateObject)
        const queryResults = await query;
        res.json({
            status: true,
            data: queryResults
        });
})

module.exports = {
    me
}