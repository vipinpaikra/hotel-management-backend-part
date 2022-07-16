const express = require("express");
const router = express.Router();
/*! const {getAllUser}=require('../controllers/user');
router.get('/path',getAllUser);
 */

const {
    updateUser,
    deleteUser,
    getAllUser,
    getUserById,
} = require("../controllers/user");
const {
    verifyToken,
    verifyUser,
    verifyAdmin,
} = require("../utils/verifyTokens");

// //*Check authentication of user
// router.get("/checkauthentication", verifyUser, (req, res, next) => {
//     res.send("hello user , you are logged in and you can delete account");
// });
// router.get("/checkauthentication/:id", verifyAdmin, (req, res, next) => {
//     res.send("hello Admin, you are logged in and you can delete account");
// });

//* UPDATE Route
router.put("/user/:id", verifyUser, updateUser);
//* DELETE
router.delete("/users/:id", verifyUser, deleteUser);
//* GET USER BY ID
router.get("/user/:id", verifyUser, getUserById);
//* GET ALL USER
router.get("/users", verifyUser, getAllUser);




module.exports = router;
