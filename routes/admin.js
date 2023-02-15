const express = require('express')
const { createAdmin, loginAdmin } = require("../controllers/admin.js");
const { verifyAdminJWT } = require("../middleware/verifyJWT.js");

const router = express.Router();
router.post("/login", loginAdmin);
router.post("/", verifyAdminJWT, createAdmin);

module.exports = router;