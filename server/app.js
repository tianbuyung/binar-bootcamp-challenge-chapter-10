const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const categoriesRouter = require("./routes/categories");
const cartsRouter = require("./routes/carts");
const cartDetailsRouter = require("./routes/cartDetails");
const ordersRouter = require("./routes/orders");

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/categories", categoriesRouter);
app.use("/carts", cartsRouter);
app.use("/cartDetails", cartDetailsRouter);
app.use("/orders", ordersRouter);

module.exports = app;
