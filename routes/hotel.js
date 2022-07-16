const express = require("express");
const router = express.Router();
/*! const {getAllUser}=require('../controllers/user');
router.get('/path',getAllUser);
 */

const {
    createHotel,
    updateHotel,
    deleteHotel,
    getAllHotel,
    getHotelById,
    countByCity,
    countByType,
    getHotelRooms,
} = require("../controllers/hotel");
const { verifyAdmin } = require("../utils/verifyTokens");

//* CREATE Route
router.post("/hotels", verifyAdmin, createHotel);
//* UPDATE Route
router.put("/hotels/:id", verifyAdmin, updateHotel);
router.delete("/hotels/:id", verifyAdmin, deleteHotel);
router.get("/hotels/:id", getHotelById);
router.get("/hotels", getAllHotel);
router.get("/hotels/find/countByCity", countByCity);
router.get("/hotels/find/countByType", countByType);
router.get("/hotels/room/:id", getHotelRooms);

module.exports = router;
