const dashboardRoute = require("./dashboard.route");
const productsRoute = require("./product.route");
const productsCategoryRoute = require("./product-category.route");
const rolesRoute = require("./role.route");
const accountsRoute = require("./account.route");
const authRoute = require("./auth.route");
const profileRoute = require("./profile.route");
const settingRoute = require("./setting.route");
const systemConfig = require("../../config/system");

const authMiddleware = require("../../middlewares/admin/auth.middleware");

module.exports.index = (app) => {
  const path = `/${systemConfig.prefixAdmin}`;

  app.use(
    `${path}/dashboard`,
    authMiddleware.requireAuth,
    dashboardRoute
  );

  app.use(
    `${path}/products`,
    authMiddleware.requireAuth,
    productsRoute
  );

  app.use(
    `${path}/products-category`,
    authMiddleware.requireAuth,
    productsCategoryRoute
  );

  app.use(
    `${path}/roles`,
    authMiddleware.requireAuth,
    rolesRoute
  );

  app.use(
    `${path}/accounts`,
    authMiddleware.requireAuth,
    accountsRoute
  );

  app.use(
    `${path}/profile`,
    authMiddleware.requireAuth,
    profileRoute
  );

  app.use(
    `${path}/settings`,
    authMiddleware.requireAuth,
    settingRoute
  );

  app.use(`${path}/auth`, authRoute);
}