const router = require("express").Router();
const clerkAuth = require("../middleware/clerkAuth");
const {
  list,
  create,
  getOne,
  update,
  remove,
} = require("../controllers/itineraryController");

router.use(clerkAuth);
router.get("/", list);
router.post("/", create);
router.get("/:id", getOne);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;

