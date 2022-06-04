const express = require("express");
const router = express.Router();
const internshipController = require("../controllers/internshipController");

router.get("/internship", internshipController.get);
router.get("/internship/:id", internshipController.detail);
router.get("/internship/batch/:id", internshipController.detailBatch);
router.delete("/internship/:id", internshipController.remove);
router.post("/internship/", internshipController.createInternship);
router.put("/internship/:id", internshipController.update);

module.exports = router;
