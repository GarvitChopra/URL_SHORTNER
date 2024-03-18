const express = require("express");
const { connectToMongoDB } = require("./connect");
const cookieParser = require("cookie-parser");
const URL = require("./models/url");
const path = require("path");
const app = express();
const PORT = 8001;
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middleware/auth");

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=> console.log("MONGODB CONNECTED"));

app.set("view engine",'ejs');
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/url",restrictToLoggedinUserOnly,urlRoute);
app.use("/", checkAuth ,staticRoute);
app.use("/user",userRoute);

app.listen(PORT,()=> console.log(`LISTENING AT PORT : ${PORT}`));