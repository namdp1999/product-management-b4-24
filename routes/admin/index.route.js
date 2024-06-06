const dashboardRoute = require("./dashboard.route");

module.exports.index = (app) => {  
  app.use("/admin/dashboard", dashboardRoute);
}