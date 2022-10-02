const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/portfolio_userDB", {
    useNewUrlParser: true
}).then(() => {
    console.log("Connection Successful");
}).catch((err) => {
    console.log(err);
    console.log(err);
});