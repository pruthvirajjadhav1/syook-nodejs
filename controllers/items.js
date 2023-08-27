const items = require("../models/items");
const HttpStatus = require("http-status-codes");
const logger = require("../utils/logger");

exports.addItem = (req,res)=>{
    logger.debug("inside add item api");
    const {name,price} = req.body;
    items.findOne({name})
    .then((result)=>{
        if(result!=null)
            return Promise.reject(new Error("Item already exists."));
        else
            return items.create({name,price});
    })
    .then((savedItem)=>{
        logger.debug("Item saved successfully");
        res.status(HttpStatus.OK).json({message:"Item saved successfully",item:savedItem});
    })
    .catch((err)=>{
        logger.error(err.message);
        res.status(HttpStatus.BAD_REQUEST).json({error:err.message});
    })
}

exports.getAllItems = (req,res)=>{
    logger.debug("inside get all item api");
    items.find()
    .then((result)=>{
        res.status(HttpStatus.OK).json(result);
    })
    .catch((err)=>{
        logger.error(err.message);
        res.status(HttpStatus.BAD_REQUEST).json({error:err.message});
    })
}

exports.getItemByName = (req,res)=>{
    logger.debug("inside get item by name api");
    const {name} = req.query;
    items.findOne({name})
    .then((result)=>{
        if(result==null)
            return Promise.reject(new Error("Item not exists."));
        else{
            logger.debug("Item data fetched successfully");
            res.status(HttpStatus.OK).json({message: "Item data fetched successfully", item:result})
        }
    })
    .catch((err)=>{
        logger.error(err.message);
        res.status(HttpStatus.BAD_REQUEST).json({error:err.message});
    })
}

exports.updateItem = (req,res)=>{
    logger.debug("inside update item api");
    const {name,price} = req.body;
    items.findOne({name})
    .then((result)=>{
        if(result==null)
            return Promise.reject(new Error("Item not exists."));
        else
            return items.updateOne({name},{$set:{price:price}},{new:true});
    })
    .then((updatedItem)=>{
        logger.debug("Item data updated successfully");
        res.status(HttpStatus.OK).json({message: "Item data updated successfully", newItem:updatedItem});
    })
    .catch((err)=>{
        logger.error(err.message);
        res.status(HttpStatus.BAD_REQUEST).json({error:err.message});
    })
}