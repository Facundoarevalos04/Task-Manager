const errorResponse = require("../helpers/errorResponse");
const {verify, decode} = require("jsonwebtoken");
const createHttpError = require("http-errors");
const User = require("../database/models/User");

module.exports = async (req, res, next) => {
    try {

        if (!req.headers.authorization) {
            throw createHttpError(401, 'se requiere un token')
        };

        const token = req.headers.authorization;
        const decoded = verify(token, process.env.JSON_WB);

        req.user = await User.findById(decoded.id).select("name")

        next();
        
    } catch (error) {

       /*  console.log(error.message)

        switch (error.message) {
            case "jwt expired":
                createHttpError(403, "el token ha expirado")
                break;
            case "invalid signature":
                createHttpError(400, "El token no es valido")
            break;
        } */

        return errorResponse(res, error, "CHECK-TOKEN");
    };
};