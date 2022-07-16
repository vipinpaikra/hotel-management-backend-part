const express = require("express");
const router = express.Router();
/*! const {getAllUser}=require('../controllers/user');
router.get('/path',getAllUser);
 */
const {
    createRoom,
    updateRoom,
    deleteRoom,
    getAllRoom,
    getRoomById,
    updateRoomAvailability,
} = require("../controllers/room");
const { verifyAdmin } = require("../utils/verifyTokens");

//* CREATE Route
router.post("/rooms/:hotelid", verifyAdmin, createRoom);
//* UPDATE Route
router.put("/rooms/:id", verifyAdmin, updateRoom);
router.put("/rooms/availability/:id", updateRoomAvailability);
//* DELETE
router.delete("/rooms/:id/:hotelid", verifyAdmin, deleteRoom);
router.delete("/rooms/:id", verifyAdmin, deleteRoom);
//* Fetch room by id
router.get("/rooms/:id", getRoomById);
//*Fetch all room
router.get("/rooms", getAllRoom);

module.exports = router;
