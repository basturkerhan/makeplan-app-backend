const asyncHandler = require("express-async-handler");
const CustomError = require("../helpers/errors/CustomError");
const Card = require("../models/Card");
const User = require("../models/User");

const addFollower = asyncHandler(async (req, res, next) => {
    let card = Card.findById(req.params.card_id);
    card = card.populate({
        path: 'followers',
        select: `firstName lastName`
    })
    card = await card;
    const { userID } = req.body

    const user = await User.findById(userID)
    card.followers.map(user=>{
        console.log(user._id)
        console.log(userID)
        console.log( String(user._id) === String(userID))
        if(String(user._id) === String(userID))
            return next(new CustomError("bu üye zaten mevcut"), 400)
    })

    card.followers.push(user)
    await card.save()

    res.json({
        status: true,
        user,
        card
    })
})

const updateCard = asyncHandler(async (req, res, next) => {
    let card = Card.findById(req.params.card_id);
    const info = req.body
    card = card.populate({
        path: 'followers',
        select: `firstName lastName`
    })
    card = await card;
    card.text = info.text ? info.text : card.text
    card.description = info.description ? info.description : card.description
    await card.save()
    res.json({
        status: true,
        data: card
    })
})

const deleteCardFollower = asyncHandler(async(req,res, next)=>{
    const { userID } = req.body;
    let populateObject = {path: 'followers', select: `firstName lastName` }
    let card = await Card.findById(req.params.card_id)
    if (!card.followers.includes(userID))
        return next(new CustomError("bu üye zaten mevcut değil"), 400)
    
    card.followers.splice( card.followers.indexOf(userID), 1);
    await card.save();

    card = Card.findById(req.params.card_id).populate(populateObject)
    let result = await card

    res.json({
        status: true,
        card: result,
        message: "Kullanıcı kart takipçiliğinden çıkartıldı"
    })
})

const changeImage = asyncHandler(async (req, res, next) => {
    let card = Card.findById(req.params.card_id);
    card = card.populate({
        path: 'followers',
        select: `firstName lastName`
    })
    card = await card;
    const {path} = req.body

    card.image = path
    await card.save()
    
    res.json({
        status: true,
        card
    })
})


module.exports = {
    addFollower,
    updateCard,
    deleteCardFollower,
    changeImage
}