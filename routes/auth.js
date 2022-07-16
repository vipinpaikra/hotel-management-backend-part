const express = require("express");
const { register, login } = require("../controllers/auth");
const router = express.Router();
/*! const {getAllUser}=require('../controllers/user');
router.get('/path',getAllUser);
 */
router.post("/auth/register", register);
router.post("/auth/login", login);
module.exports = router;
