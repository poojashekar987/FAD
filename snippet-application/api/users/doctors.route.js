const router = require("express").Router();

const controller = require("./doctors.controller");

router.post("/register", controller.createUser);
router.get("/register", controller.getReg);
router.post("/login", controller.doctorLogin);
router.get("/login", controller.getLogin);
router.get("/getPatientData" , controller.getPatientData);


module.exports = router;
