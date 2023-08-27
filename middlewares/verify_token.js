require('dotenv').config();
const apiUtils=require('../utils/apiUtils');
const HttpStatus=require('http-status-codes');
const logger = require("../utils/logger");

const verify_token=(req,res,next)=>{
    logger.debug('inside verify token middleware')
    const token=req.headers['token'];
    apiUtils.verifyAccessToken(token,process.env.TOKEN_SECRET)
    .then((payload)=>{
        logger.debug('token verified');
        next();
    })
    .catch((err)=>{
        logger.error(err.message)
        res.status(HttpStatus.UNAUTHORIZED).json({message : err.message});
    })
}

module.exports=verify_token;