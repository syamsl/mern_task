const express = require("express");
const router = express.Router();

const { upload, remove } = require("../controllers");

router.post("/uploadimage", upload);
router.post("/removeimage", remove);

module.exports = router;
