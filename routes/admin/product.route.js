const express = require("express");
const multer  = require('multer');
const router = express.Router();

const controller = require("../../controllers/admin/product.controller");

const storageMulterHelper = require("../../helpers/storageMulter.helper");

const upload = multer({ storage: storageMulterHelper.storage });

router.get("/", controller.index);

router.patch("/change-status/:statusChange/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.patch("/delete/:id", controller.deleteItem);

router.patch("/change-position/:id", controller.changePosition);

router.get("/create", controller.create);

router.post(
  "/create", 
  upload.single('thumbnail'), 
  controller.createPost
);

module.exports = router;