const express = require("express");
const multer  = require('multer');

const router = express.Router();

const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const upload = multer();

router.get("/", controller.index);

router.patch("/change-status/:statusChange/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.patch("/delete/:id", controller.deleteItem);

router.patch("/change-position/:id", controller.changePosition);

router.get("/create", controller.create);

router.post(
  "/create", 
  upload.single('thumbnail'),
  uploadCloud.uploadSingle,
  validate.createPost,
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id", 
  upload.single('thumbnail'),
  uploadCloud.uploadSingle,
  validate.createPost,
  controller.editPatch
);

router.get("/detail/:id", controller.detail);

module.exports = router;