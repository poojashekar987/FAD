const router = require("express").Router();

const controller = require("./users.controller");

router.post("/register", controller.createUser);
router.get("/register", controller.getReg);
router.post("/login", controller.userLogin);
router.get("/login", controller.getLogin);
router.get("/dataForm",controller.getForm);
router.post("/postData" , controller.createData)
router.get("/success", controller.getSuccess);
router.get("/failure", controller.getFailure);




module.exports = router;
