const { isTokenIncluded, getAccessTokenFromHeader } = require("../helpers/autherization/tokenHelpers");
const CustomError = require("../helpers/errors/CustomError");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config");

const getAccessToRoute = (req, res, next) => {
    if (!isTokenIncluded(req)) {
        return next(new CustomError("Lütfen bir token giriniz", 401));
    }
    const access_token = getAccessTokenFromHeader(req);
    jwt.verify(access_token, config.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(new CustomError("Lütfen geçerli bir token giriniz", 401));
        }
        req.user = {
            id: decoded.id,
            firstName: decoded.firstName,
            lastName: decoded.lastName
        }
        next();
    })
}

module.exports = {
    getAccessToRoute
}