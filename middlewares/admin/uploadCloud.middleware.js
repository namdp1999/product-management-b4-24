const streamUpload = require("../../helpers/streamUpload.helper");

module.exports.uploadSingle = (req, res, next) => {
  if(req.file) {
    const uploadToCloudinary = async (buffer) => {
      const result = await streamUpload(buffer);
      req.body[req.file.fieldname] = result.url;
      next();
    }

    uploadToCloudinary(req.file.buffer);
  } else {
    next();
  }
}