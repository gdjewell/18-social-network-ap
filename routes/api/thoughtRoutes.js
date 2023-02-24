const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  newThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts).post(newThought);
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:id/reactions").post(addReaction);

router.route("/:id/reactions/:reactionId").delete(removeReaction);

module.exports = router;
