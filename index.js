require("dotenv").config();
const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const url = process.env.DATABASE;
const port = process.env.PORT || 5000;
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/user");
const hotelsRoute = require("./routes/hotel");
const roomsRoute = require("./routes/room");
const cookieParser = require("cookie-parser");

mongoose
    .connect(url, {
        useNewUrlParser: true,

        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(`Database connected Successfully`);
    })
    .catch((e) => console.log(`Error in DB ${e}`));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api", authRoute);
app.use("/api", usersRoute);
app.use("/api", hotelsRoute);
app.use("/api", roomsRoute);

// err handler
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
}

app.listen(port, () => {
    console.log(`Server is running at port http://localhost:${port}`);
});
