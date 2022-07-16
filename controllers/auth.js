const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { createError } = require("../utils/error");
var jwt = require("jsonwebtoken");
/* exports.getAllUser = (req, res) => {
    User.find().exec((err, users) => {
        if (err) {
            return res.status(400).json({
                error: err,
            });
        }
        return  res.status(200).json(users)
    });
};
 */
exports.register = (req, res, next) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
        ...req.body,
        password: hash,
    });
    newUser
        .save()
        .then((user) => res.status(200).send("User has been created"))
        .catch((err) => next(err));
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found"));
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect) {
            return next(createError(400, "Wrong password or username"));
        }
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET
        );

        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json({ details: { ...otherDetails }, isAdmin });
    } catch (err) {
        next(err);
    }
};
