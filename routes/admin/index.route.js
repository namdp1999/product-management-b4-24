const dashboardRoute = require("./dashboard.route");
const productsRoute = require("./product.route");

module.exports.index = (app) => {  
  app.use("/admin/dashboard", dashboardRoute);
  app.use("/admin/products", productsRoute);
}