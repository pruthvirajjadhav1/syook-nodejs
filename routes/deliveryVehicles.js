const router = require("express").Router();
const {addDeliveryVehicle,getAllVehicles,getVehicleByRegistrationNumber,updateVehicle} = require("../controllers/deliveryVehicles");
const verify_token = require("../middlewares/verify_token");

router.post("/add",verify_token,addDeliveryVehicle);
router.get("/getAll",verify_token,getAllVehicles);
router.get("/get/:registrationNumber",verify_token,getVehicleByRegistrationNumber);
router.put("/update",verify_token,updateVehicle);

module.exports = router;