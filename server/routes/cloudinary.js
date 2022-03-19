const express = require("express");
const router = express.Router();

const { upload, remove } = require("../controllers/cloudinary.js");

router.post("/uploadimage", upload);
router.post("/removeimage", remove);

module.exports = router;
