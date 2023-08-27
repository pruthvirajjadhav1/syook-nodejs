const customers = require("../models/customers");
const HttpStatus = require("http-status-codes");
const logger = require("../utils/logger");

exports.addCustomer = (req,res)=>{
    logger.debug("inside add customer api");
    const {name,city} = req.body;
    customers.findOne({name})
    .then((cust)=>{
        if(cust!=null)
            return Promise.reject(new Error("customer already exists"));
        else
            return customers.create({name,city});
    })
    .then((savedCust)=>{
        logger.debug("customer saved successfully");
        res.status(HttpStatus.OK).json({message:"customer saved successfully", savedCust});
    })
    .catch((err)=>{
        logger.error(err.message);
        res.status(HttpStatus.BAD_REQUEST).json({error: err.message});
    })
}

exports.getAllCustomers = (req,res)=>{
    logger.debug("inside get all customer api");
    customers.find()
    .then((data)=>{
        logger.debug("customers data fetched successfully");
        res.status(HttpStatus.OK).json({message: "customers data fetched successfully", customersList:data});
    })
    .catch((err)=>{
        logger.error(err.message);
        res.status(HttpStatus.BAD_REQUEST).json({error: err.message});
    })
}

exports.getCustomerByName = (req,res)=>{
    logger.debug("inside get customer by name api");
    const {name} = req.query;
    customers.findOne({name})
    .then((result)=>{
        if(result==null)
            return Promise.reject(new Error("Customer not exists."));
        else{
            logger.debug("Customer data fetched successfully");
            res.status(HttpStatus.OK).json({message: "Customer data fetched successfully", customer:result})
        }
    })
    .catch((err)=>{
        logger.error(err.message);
        res.status(HttpStatus.BAD_REQUEST).json({error:err.message});
    })
}

exports.updateCustomer = (req,res)=>{
    logger.debug("inside update customer api");
    const {name,city} = req.body;
    customers.findOne({name})
    .then((result)=>{
        if(result==null)
            return Promise.reject(new Error("Customer not exists."));
        else
            customers.updateOne({name},{$set:{city:city}},{new:true});
    })
    .then((updatedCustomer)=>{
        logger.debug("Customer updated successfully");
        res.status(HttpStatus.OK).json({message:"Customer updated successfully", updatedCustomer: updatedCustomer});
    })
    .catch((err)=>{
        logger.error(err.message);
        res.status(HttpStatus.BAD_REQUEST).json({error:err.message});
    })
}