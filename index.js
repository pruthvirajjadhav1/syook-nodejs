require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const { mongoConnect } = require('./utils/dbutils');
const cors=require('cors');
const logger = require('./utils/logger');
const itemsRouter = require("./routes/items");
const custRouter = require("./routes/customers");
const vehiclesRouter = require("./routes/deliveryVehicles");
const orderRouter = require("./routes/orders");
const tokenRouter = require("./routes/generateToken");

app.use(cors());
app.use(express.json());
app.use("/items",itemsRouter);
app.use("/customers",custRouter);
app.use("/vehicles",vehiclesRouter);
app.use("/orders",orderRouter);
app.use("/accessToken",tokenRouter);

mongoConnect()
  .then(()=>{
      logger.info('Successfully connected to DB');
  })
  .catch((err)=>{
      logger.error(err.message);
  })

app.listen(port, () => {
  logger.info(`App listening on port : http://localhost:${port}!`)
});