require("dotenv").config();
const apiUtils = require("../utils/apiUtils");
const HttpStatus = require("http-status-codes");
const logger = require("../utils/logger");
const secret = process.env.TOKEN_SECRET;

exports.generateToken = (req,res)=>{
    logger.debug("inside generate token")
    const payload= {
        message: "For testing purpose"
    }
    const token = apiUtils.generateAccessToken(payload,secret);
    res.status(HttpStatus.OK).json({token});
}