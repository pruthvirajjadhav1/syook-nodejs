const orders = require("../models/orders");
const HttpStatus = require("http-status-codes");
const items = require("../models/items");
const customers = require("../models/customers");
const deliveryVehicles = require("../models/deliveryVehicles");
const logger = require("../utils/logger");

exports.placeOrder = (req,res)=>{
    logger.debug("inside place order api");
    const {itemId,customerId} = req.body;
    var item,customer,vehicle,orderPlaced;
    orders.findOne({itemId,customerId})
    .then((order)=>{
        if(order==null)
            return items.findById(itemId)
        else 
            return Promise.reject(new Error("order already placed"));
    })
    .then((it)=>{
        if(it==null)
            return Promise.reject(new Error("Item not exists"));
        else{
            item=it;
            return customers.findById(customerId);
        }
    })
    .then((cust)=>{
        if(cust==null)
            return Promise.reject(new Error("Customer not exists"));
        else{
            customer=cust;
            return deliveryVehicles.findOne({city:customer.city});
        }
    })
    .then((veh)=>{
        if(veh==null)
            return Promise.reject(new Error("Can't place an order because we don't have vehicle of your city"));
        else{
            vehicle=veh;
            if(veh.activeOrdersCount>=2)
                return Promise.reject(new Error("Can't place an order, because vehicle is already booked."));
            else
                return getNextOrderNumber();    
        }
    })
    .then((orderNumber)=>{
        return orders.create({orderNumber, itemId:item._id, price:item.price, customerId:customer._id, deliveryVehicleId:vehicle._id});
    })
    .then((order)=>{
        orderPlaced=order;
        return deliveryVehicles.findByIdAndUpdate(vehicle._id,{$inc:{activeOrdersCount:1}},{new:true});
    })
    .then((updatedVehicle)=>{
        logger.debug("Order placed successfully");
        res.status(HttpStatus.OK).json({message:"Order placed successfully",orderPlaced,updatedVehicle});
    })
    .catch((err)=>{
        logger.error(err.message);
        res.status(HttpStatus.BAD_REQUEST).json({message:err.message});
    })
}

exports.getAllOrders = (req,res)=>{
    orders.find()
    .then((allOrders)=>{
        res.status(HttpStatus.OK).json({message:"all orders fetched successfully",allOrders});
    })
    .catch((err)=>{
        logger.error(err.message);
        res.status(HttpStatus.BAD_REQUEST).json({message:err.message});
    })
}

exports.getOrderById = (req,res)=>{
    const {orderId} = req.query;
    orders.findById(orderId)
    .then((order)=>{
        if(order==null)
            return Promise.reject(new Error("order not exists"));
        else
            res.status(HttpStatus.OK).json({message:"order details fetched successfully",order});
    })
    .catch((err)=>{
        logger.error(err.message);
        res.status(HttpStatus.BAD_REQUEST).json({message:err.message});
    })
}

exports.orderDelivered = (req,res)=>{
    const {orderId} = req.body;
    var orderFromDb;
    orders.findById(orderId)
    .then((order)=>{
        if(order==null)
            return Promise.reject(new Error("order not exists"));
        else{
            orderFromDb=order;
            return orders.findByIdAndUpdate(order._id,{$set:{isDelivered:true}},{new:true});
        }
    })
    .then(()=>{
        logger.debug("order marked as delivered");
        return deliveryVehicles.findByIdAndUpdate(orderFromDb.deliveryVehicleId,{$inc:{activeOrdersCount:-1}},{new:true});
    })
    .then(()=>{
        logger.debug("vehicle released");
        res.status(HttpStatus.OK).json({message:"order delivered"});
    })
    .catch((err)=>{
        logger.error(err.message);
        res.status(HttpStatus.BAD_REQUEST).json({message:err.message});
    })
}

const getNextOrderNumber = ()=>{
    return new Promise((resolve,reject)=>{
        orders.find()
        .then((result)=>{
            resolve(result.length+1);
        })
        .catch((err)=>{
            reject(err);
        })
    })
}