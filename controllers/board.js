const asyncHandler = require("express-async-handler");
const Board = require("../models/Board");
const CustomError = require("../helpers/errors/CustomError");
const User = require("../models/User");
const List = require("../models/List");
const Card = require("../models/Card");
const Notification = require("../models/Notification");

const createNewBoard = asyncHandler(async (req, res, next) => {
    const { name, description } = req.body;
    const owner = await User.findOne({ _id: req.user.id });
    const board = await Board.create({
        name,
        description,
        owner: req.user.id,
    })
    if (!board) {
        return next(new CustomError("Pano Oluşturulamadı, bilgileri kontrol edin.", 400));
    }
    //SET BOARD'S ATTRIBUTES
    board.members.push(owner._id);
    const notify = await Notification.create({
        notificationOwnerFirstName: owner.firstName,
        notificationOwnerLastName: owner.lastName,
        notificationText: "Pano oluşturuldu"
    })
    board.lastActivities.push(notify);
    await board.save();

    //SET BOARD'S OWNER
    owner.Boards.push(board._id);
    await owner.save();

    res.json({
        status: true,
        message: "Pano başarıyla oluşturuldu",
        data: board
    })
})

const getBoard = asyncHandler(async (req, res) => {
    let query = req.board;

    let populateObject =
    {
        path: "lists members lastActivities",
        select: "title index cards firstName lastName notificationOwnerFirstName notificationOwnerLastName notificationText",
        populate: { path: 'cards', populate: { path: 'followers', select: `firstName lastName` } }
    }
    query = query.populate(populateObject)
    const queryResults = await query;
    res.json({
        status: true,
        data: queryResults
    });
})


const createList = asyncHandler(async (req, res) => {
    const board = await req.board;
    const list = await List.create({
        title: req.body.title,
        index: board.lists.length,
        cards: [],
        ownerBoard: board._id
    })
    board.lists.push(list._id);
    await board.save();

    res.json({
        status: true,
        data: list
    })
})

const deleteBoard = asyncHandler(async (req, res, next) => {
    let board = await req.board
    let user = await req.member

    if( String(user._id) !== String(board.owner._id) )
        return next(new CustomError("Panoyu sadece pano sahibi kaldırabilir", 400))

    await board.remove()
    await user.save()
    res.json({
        status: true,
        data: user
    })
})

const handleEvent = asyncHandler(async (req, res, next) => {
    const { sourceId, destinationId, sourceIndex, destinationIndex, type } = req.query;
    if (type === "list") {
        const board = await req.board;
        const listId = board.lists.splice(sourceIndex, 1);
        board.lists.splice(destinationIndex, 0, listId);
        await board.save();
    }
    if (sourceId === destinationId && type !== "list") {
        const list = await List.findById(sourceId);
        const cardId = list.cards.splice(sourceIndex, 1);
        list.cards.splice(destinationIndex, 0, cardId);
        await list.save();
    }

    if (sourceId !== destinationId && type !== "list") {
        const firstList = await List.findById(sourceId);
        const secondList = await List.findById(destinationId);
        const cardId = firstList.cards.splice(sourceIndex, 1);
        let card = await Card.findById(cardId);
        card.ownerList = secondList._id;
        await card.save();
        secondList.cards.splice(destinationIndex, 0, cardId);
        await firstList.save();
        await secondList.save();
    }

    res.json({
        status: true,
    })
})

const renameBoard = asyncHandler(async (req, res, next) => {
    let board = await req.board;
    board.name = req.body.name;

    const notify = await Notification.create({
        notificationOwnerFirstName: req.user.firstName,
        notificationOwnerLastName: req.user.lastName,
        notificationText: `panonun ismi ${board.name} olarak değiştirildi`
    })
    board.lastActivities.push(notify);

    await board.save()
    res.json({
        status: true
    })
})

const inviteMember = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    const board = await req.board;

    const user = await User.findOne({ email });
    if (!user) {
        return next(new CustomError("Bu email adresine kayıtlı kullanıcı bulunamadı", 400));
    }
    if (user.Boards.includes(board._id)) {
        return next(new CustomError("Üye zaten bu panoya ekli"), 400);
    }
    user.Boards.push(board);
    await user.save();
    board.members.push(user);

    const notify = await Notification.create({
        notificationOwnerFirstName: req.user.firstName,
        notificationOwnerLastName: req.user.lastName,
        notificationText: `${user.firstName} ${user.lastName} panoya eklendi`
    })
    board.lastActivities.push(notify);

    await board.save();

    res.json({
        status: true,
        data: user
    })
})

const deleteMember = asyncHandler(async (req, res, next) => {
    const { userID } = req.body;
    const board = await req.board;

    let user = await User.findById( userID );
    if (!user)  return next(new CustomError("Böyle bir kullanıcı bulunamadı", 400));
    if (!user.Boards.includes(board._id))   return next(new CustomError("Üye zaten bu panoda değil"), 400);
    
    user.Boards.splice( user.Boards.indexOf(board._id), 1);
    await user.save();
    board.members.splice( board.members.indexOf(userID), 1);

    const notify = await Notification.create({
        notificationOwnerFirstName: req.user.firstName,
        notificationOwnerLastName: req.user.lastName,
        notificationText: `${user.firstName} ${user.lastName} üyelerden kaldırıldı`
    })
    board.lastActivities.push(notify);

    await board.save();
    res.json({
        status: true,
        data: user,
        message: "Kullanıcı pano üyeliğinden çıkartıldı"
    })
})

const changeBackground = asyncHandler(async(req,res,next)=>{
    const board = await req.board;
    board.background = req.body.path;

    const notify = await Notification.create({
        notificationOwnerFirstName: req.user.firstName,
        notificationOwnerLastName: req.user.lastName,
        notificationText: "pano arkaplanı değiştirildi"
    })
    board.lastActivities.push(notify);
    await board.save();
    res.json({
        status: true
    })
})

const unfollowBoard = asyncHandler(async(req,res,next)=>{
    let member = req.member;
    let board = await req.board;
    if (!board.members.includes(member._id)) return next(new CustomError("Üye zaten bu panoda değil"), 400);
    
    member.Boards.splice( member.Boards.indexOf(board._id), 1);
    await member.save();
    if(board.owner === member._id || board.members.length == 1) {
        await board.remove()
    }
    else {
        board.members.splice( board.members.indexOf(member._id), 1);
        await board.save();
    }
    
    res.json({
        status: true,
    })
})

module.exports = {
    createNewBoard,
    getBoard,
    createList,
    handleEvent,
    renameBoard,
    inviteMember,
    deleteBoard,
    deleteMember,
    changeBackground,
    unfollowBoard
}