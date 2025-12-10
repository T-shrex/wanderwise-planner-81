const router = require("express").Router();
const clerkAuth = require("../middleware/clerkAuth");
const { me } = require("../controllers/authController");

// Clerk handles login/register on the frontend; we only expose /me for profile data
router.get("/me", clerkAuth, me);

module.exports = router;

