const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const CustomError = require("../helpers/errors/CustomError");
const {comparePassword} = require("../helpers/input/inputHelpers");
const { sendJwtToClient } = require('../helpers/autherization/tokenHelpers');

const register = asyncHandler(async(req,res)=>{
    const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })
    res.json({
        status: true,
        data: "Kullanıcı başarıyla kaydedildi"
    })
})

const login = asyncHandler(async(req,res,next)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email}).select("+password");
    if(!user) {
        return next(new CustomError("Böyle bir kullanıcı bulunamadı",400) );
    }
    if(!comparePassword(password, user.password)){
        return next(new CustomError("Girdiğiniz şifre doğru değil", 400));
    }
    sendJwtToClient(user, res);
})

const logout = asyncHandler(async (req, res, next) => {
    const { NODE_ENV } = process.env
    return res
        .status(200)
        .cookie({
            httpOnly: true,
            expires: new Date(Date.now()),
            security: NODE_ENV === "development" ? false : true
        })
        .json({
            status: true,
            message: "Başarıyla çıkış yapıldı"
        })
})

module.exports = {
    register,
    login,
    logout
}