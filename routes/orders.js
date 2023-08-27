const router=require("express").Router();
const {placeOrder,getAllOrders,getOrderById,orderDelivered} = require("../controllers/orders");
const verify_token = require("../middlewares/verify_token");

router.post("/new",verify_token,placeOrder);
router.get("/getAll",verify_token,getAllOrders);
router.get("/get:orderId",verify_token,getOrderById);
router.put("/orderDeliver",verify_token,orderDelivered);

module.exports = router;