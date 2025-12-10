const router = require("express").Router();
const clerkAuth = require("../middleware/clerkAuth");
const { reply } = require("../controllers/chatController");

router.post("/", clerkAuth, reply);

module.exports = router;

