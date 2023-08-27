require('dotenv').config();
const mongoose=require('mongoose');
const logger = require('./logger');

try{
    const uri=process.env.MONGO_URI;

    exports.mongoConnect=()=>{
        return mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
        
    }
    
    exports.mongoDisConnect=()=>{
        return mongoose.disconnect()
    }
}
catch(err){
    logger.error(err.message);
}