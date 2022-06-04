const loginController = require("../controllers/loginController");

const router = require("express").Router();

router.post("/login", loginController.login);

module.exports = router;
