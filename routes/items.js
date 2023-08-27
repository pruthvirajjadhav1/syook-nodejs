const router = require("express").Router();
const {addItem,getAllItems,getItemByName,updateItem} = require("../controllers/items");
const verify_token = require("../middlewares/verify_token");

router.post("/add",verify_token,addItem);
router.get("/getAll",verify_token,getAllItems);
router.get("/get/:name",verify_token,getItemByName);
router.put("/update",verify_token,updateItem);

module.exports = router;