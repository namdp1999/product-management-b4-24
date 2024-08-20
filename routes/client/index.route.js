const homeRoute = require("./home.route");
const productRoute = require("./product.route");
const searchRoute = require("./search.route");
const cartRoute = require("./cart.route");
const checkoutRoute = require("./checkout.route");
const userRoute = require("./user.route");
const chatRoute = require("./chat.route");
const usersRoute = require("./users.route");
const roomsChatRoute = require("./rooms-chat.route");

const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const userMiddleware = require("../../middlewares/client/user.middleware");
const settingMiddleware = require("../../middlewares/client/setting.middleware");

module.exports.index = (app) => {
  app.use(categoryMiddleware.category);
  app.use(cartMiddleware.cartId);
  app.use(userMiddleware.infoUser);
  app.use(settingMiddleware.setting);

  app.use("/", homeRoute);
  
  app.use("/products", productRoute);

  app.use("/search", searchRoute);

  app.use("/cart", cartRoute);

  app.use("/checkout", checkoutRoute);

  app.use("/user", userRoute);

  app.use(
    "/chat",
    userMiddleware.requireAuth,
    chatRoute
  );

  app.use(
    "/users",
    userMiddleware.requireAuth,
    usersRoute
  );

  app.use(
    "/rooms-chat",
    userMiddleware.requireAuth,
    roomsChatRoute
  );
}