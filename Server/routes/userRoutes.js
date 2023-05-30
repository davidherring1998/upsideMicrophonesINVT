const { createUser, login, get } = require("../controllers/usercontroller");
const router = require("express").Router();

router.post("/", createUser);
router.post("/login", login);
router.get("/for/testing/only", get);

module.exports = router;
