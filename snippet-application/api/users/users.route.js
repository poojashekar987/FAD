const router = require("express").Router();

const controller = require("./users.controller");

router.post("/register", controller.createUser);
router.get("/register", controller.getReg);
router.post("/login", controller.userLogin);
router.get("/login", controller.getLogin);
router.post("/postData" , controller.createData)




module.exports = router;
