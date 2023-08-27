const router = require("express").Router();
const {addCustomer,getAllCustomers,getCustomerByName,updateCustomer} = require("../controllers/customers");
const verify_token = require("../middlewares/verify_token");

router.post("/add",verify_token,addCustomer);
router.get("/getAll",verify_token,getAllCustomers);
router.get("/get/:name",verify_token,getCustomerByName);
router.put("/update",verify_token,updateCustomer);

module.exports = router;