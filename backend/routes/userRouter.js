const express = require("express");
const {
  postloginUser,
  getme,
  registerUser,
  verifyEmail,
  getLogin


} = require("../controllers/userController.js");
const {protect,emailVerified}=require('../middleware/authMiddleware.js')

const router = express.Router();
 router.get('/login',getLogin)
router.post("/",registerUser);
router.get("/getme",protect,getme);
router.post("/login",emailVerified,postloginUser);
router.get("/verify-email",verifyEmail);

module.exports = router;
