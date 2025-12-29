const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { adminLogin } = require("../controllers/adminController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin/login", adminLogin);

module.exports = router;
