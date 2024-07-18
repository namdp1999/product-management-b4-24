const homeRoute = require("./home.route");
const productRoute = require("./product.route");
const searchRoute = require("./search.route");

const categoryMiddleware = require("../../middlewares/client/category.middleware");

module.exports.index = (app) => {
  app.use(categoryMiddleware.category);

  app.use("/", homeRoute);
  
  app.use("/products", productRoute);

  app.use("/search", searchRoute);
}