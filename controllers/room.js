const Room = require("../models/Room");
const Hotel = require("../models/Hotel");
const { createError } = require("../utils/error");
const { findByIdAndUpdate } = require("../models/Room");

exports.createRoom = (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);
    Hotel.findById(hotelId)
        .then(() => {
            newRoom.save((err, savedRoom) => {
                if (err) {
                    return next(err);
                }
                Hotel.findByIdAndUpdate(hotelId, {
                    $push: { rooms: savedRoom._id },
                })
                    .then((hotel) => {
                        if (!hotel) {
                            return next(404, "hotel not found");
                        }
                        next();
                    })
                    .catch((err) => {
                        return next(err);
                    });
                res.status(200).json(savedRoom);
            });
        })
        .catch((err) => next(err));
};

exports.updateRoom = (req, res, next) => {
    Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((updatedRoom) => {
            return res.status(200).json(updatedRoom);
        })
        .catch((err) => next(err));
};
exports.updateRoomAvailability = (req, res, next) => {
    Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
            $push: {
                "roomNumbers.$.unavailableDates": req.body.dates,
            },
        }
    )
        .then((updatedRoom) => {
            return res.status(200).json(updatedRoom);
        })
        .catch((err) => next(err));
};
//*fetch hotel by id
exports.getRoomById = (req, res, next) => {
    Room.findById(req.params.id).exec((err, room) => {
        if (err) {
            return next(err);
        }
        res.status(200).json(room);
        next();
    });
};
// exports.getHotel = (req, res) => {};
//*fetch all hotel
exports.getAllRoom = (req, res, next) => {
    Room.find().exec((err, rooms) => {
        if (err) {
            return next(err);
        }
        return res.status(200).json(rooms);
    });
};
//* delete hotel by id
exports.deleteRoom = (req, res, next) => {
    const hotelId = req.params.hotelid;
    Room.findByIdAndDelete(req.params.id)
        .then((deletedRoom) => {
            Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id },
            })
                .then(() => {
                    return next();
                })
                .catch((err) => next(err));
            res.status(200).json(deletedRoom);
            return next();
        })
        .catch((err) => next(err));
};
