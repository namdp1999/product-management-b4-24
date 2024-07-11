const dashboardRoute = require("./dashboard.route");
const productsRoute = require("./product.route");
const productsCategoryRoute = require("./product-category.route");
const rolesRoute = require("./role.route");
const accountsRoute = require("./account.route");
const authRoute = require("./auth.route");
const systemConfig = require("../../config/system");

module.exports.index = (app) => {
  const path = `/${systemConfig.prefixAdmin}`;

  app.use(`${path}/dashboard`, dashboardRoute);

  app.use(`${path}/products`, productsRoute);

  app.use(`${path}/products-category`, productsCategoryRoute);

  app.use(`${path}/roles`, rolesRoute);

  app.use(`${path}/accounts`, accountsRoute);

  app.use(`${path}/auth`, authRoute);
}