const {generateToken} = require("../controllers/generateToken");
const router = require("express").Router();

router.get("/new",generateToken);

module.exports = router;