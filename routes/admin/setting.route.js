const express = require("express");
const multer  = require('multer');
const router = express.Router();

const controller = require("../../controllers/admin/setting.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const upload = multer();

router.get("/general", controller.general);

router.patch(
  "/general", 
  upload.single('logo'),
  uploadCloud.uploadSingle,
  controller.generalPatch
);

module.exports = router;