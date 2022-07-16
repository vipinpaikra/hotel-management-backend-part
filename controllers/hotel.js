const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const { createError } = require("../utils/error");

//*create hotel
exports.createHotel = (req, res, next) => {
    const newHotel = new Hotel(req.body);
    newHotel.save((err, users) => {
        if (err) {
            return next(err);
        }
        return res.status(200).json(users);
    });
};

//*update hotel by Id
exports.updateHotel = (req, res, next) => {
    Hotel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    ).exec((err, updatedHotel) => {
        if (err) {
            return next(err);
        }
        return res.status(200).json(updatedHotel);
    });
};
//*fetch hotel by id
exports.getHotelById = (req, res, next) => {
    Hotel.findById(req.params.id).exec((err, hotel) => {
        if (err) {
            return next(err);
        }
        res.status(200).json(hotel);
        next();
    });
};
// exports.getHotel = (req, res) => {};
//*fetch all hotel
exports.getAllHotel = (req, res, next) => {
    const { min, max, ...others } = req.query;

    Hotel.find({ ...others, cheapestPrice: { $gt: min | 1, $lt: max || 9999 } })
        .limit(req.query.limit)
        .exec((err, hotels) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json(hotels);
        });
};
//* delete hotel by id
exports.deleteHotel = (req, res, next) => {
    Hotel.findByIdAndDelete(req.params.id).exec((err, deletedHotel) => {
        if (err) {
            return next(err);
        }
        return res.status(200).json(deletedHotel);
    });
};

exports.countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({ city: city });
            })
        );
        res.status(200).json(list);
    } catch (err) {
        return next(err);
    }
};
exports.countByType = async (req, res, next) => {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    try {
        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount },
        ]);
    } catch (err) {
        return next(err);
    }
};

exports.getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(
            hotel.rooms.map((room) => {
                return Room.findById(room);
            })
        );
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};
