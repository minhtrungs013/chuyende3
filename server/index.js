const express = require("express");
const app = express();
const dotenv = require("dotenv");

const cors = require("cors");

app.use(cors());
const { requireToken } = require("./middleware/index");

const courseRoute = require("./routers/course");
const loginRoute = require("./routers/login");
const internship = require("./routers/internship");
dotenv.config();
const port = process.env.PORT;
global.__basedir = __dirname + "/..";

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES

app.use(loginRoute);
app.use(requireToken, courseRoute);
app.use(requireToken, internship);
app.listen(port, () => {
  console.log("App start success");
});
