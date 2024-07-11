const express = require("express");
const multer  = require('multer');
const router = express.Router();

const controller = require("../../controllers/admin/account.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const upload = multer();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single('avatar'),
  uploadCloud.uploadSingle,
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id",
  upload.single('avatar'),
  uploadCloud.uploadSingle,
  controller.editPatch
);

module.exports = router;