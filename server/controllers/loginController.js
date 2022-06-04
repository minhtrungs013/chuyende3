const md5 = require("md5");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { generate } = require("../token/index");
dotenv.config();
const  login =(req, res) => {
    const { username, password } = req.body;
    if (!username) {
      return res.status(400).json("You need to enter username");
    }
    if (!password) {
      return res.status(400).json("You need to enter password");
    }
    {
      const passwordMd5 = md5(req.body.password);
      userModel.getUser({ username, passwordMd5 }, (response) => {
        if (response.length > 0) {
          const accessToken = generate(username,password);
          return res.status(200).json({ accessToken});
        }
        {
          return res.status(400).json("Incorrect userName or password");
        }
      });
    }
  }
module.exports = {
  login
}
