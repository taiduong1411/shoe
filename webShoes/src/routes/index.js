const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");
const OrderRouter = require("./OrderRouter");
const NewsRouter = require("./NewsRouter");
const ServicesRouter = require("./ServicesRouter");
const PaymentRouter = require("./PaymentRouter");
const ContactRouter = require("./ContactRouter");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRouter);
  app.use("/api/order", OrderRouter);
  app.use("/api/news", NewsRouter);
  app.use("/api/services", ServicesRouter);
  app.use("/api/payment", PaymentRouter);
  app.use("/api/contact", ContactRouter);
};
module.exports = routes;
