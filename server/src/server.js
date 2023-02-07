const express = require("express");
const cors = require("cors");
const PORT = 8080;
const dbconnect = require("./config/db");

const userRouter = require("./controllers/user/user.router");
const productRouter = require("./controllers/product/allproduct/allproduct.router");
const menproductRouter = require("./controllers/product/men/men.router");
const womenproductRouter = require("./controllers/product/women/women.router");
const kidsproductRouter = require("./controllers/product/kids/kids.router");
const clothproductRouter = require("./controllers/product/cloth/cloth.router");
const shoeproductRouter = require("./controllers/product/shoes/shoe.router");
const favouriteRouter=require("./controllers/favourite/favourite.router");
const orderRouter=require("./controllers/order/order.router")

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/allproducts", productRouter);
app.use("/men", menproductRouter);
app.use("/women", womenproductRouter);
app.use("/kids", kidsproductRouter);
app.use("/cloth", clothproductRouter);
app.use("/shoe", shoeproductRouter);
app.use("/favourite", favouriteRouter);
app.use("/order", orderRouter);


app.listen(PORT, async () => {
 try {
  await dbconnect();
  console.log(`listening on http://localhost:${PORT}`);
 } catch (error) {
  console.log(error.message);
 }
});
