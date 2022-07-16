const User = require("../models/User");
const { createError } = require("../utils/error");

//*update User by Id
exports.updateUser = (req, res, next) => {
    User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    ).exec((err, updatedUser) => {
        if (err) {
            return next(err);
        }
        return res.status(200).json(updatedUser);
    });
};
//*fetch User by id
exports.getUserById = (req, res, next) => {
    User.findById(req.params.id).exec((err, user) => {
        if (err) {
            return next(err);
        }
        res.status(200).json(user);
        next();
    });
};
// exports.getUser = (req, res) => {};
//*fetch all User
exports.getAllUser = (req, res, next) => {
    User.find().exec((err, users) => {
        if (err) {
            return next(err);
        }
        return res.status(200).json(users);
    });
};
//* delete User by id
exports.deleteUser = (req, res, next) => {
    User.findByIdAndDelete(req.params.id).exec((err, deletedUser) => {
        if (err) {
            return next(err);
        }
        return res.status(200).json(deletedUser);
    });
};
