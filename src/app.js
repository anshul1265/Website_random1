// requiring all the packages
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// connecting to mongoose in conn.js and requiring it here
require("./db/conn");
const User = require("./models/usermessage");
const hbs = require("hbs");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// setting up the paths
const staticPath = path.join(__dirname + "/../public");
const templatePath = path.join(__dirname + "/../templates/views");
const partialPath = path.join(__dirname + "/../templates/partials");

// using this to shorten the code
app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use("/jq", express.static(path.join(__dirname, "../node_modules/jquery/dist")));

app.use(express.static(staticPath));

// setting up the view engine
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialPath);

// using the environment variables
const PORT = process.env.PORT || 3000;

// get to the home route
app.get("/", (req, res) => {
    res.render("index");
});

// posting the message to the database
app.post("/contact", (req, res) => {
    const user1 = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    });
    user1.save(function (err) {
        if (!err) res.render("index");
        else console.log(err);
    });
});

// listen to the port
app.listen(PORT, (req, res) => {
    console.log(`Server running on port ${PORT}`);
})