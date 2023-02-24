const router = require("express").Router();
const {
  getAllUsers,
  getUser,
  newUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

router.route("/").get(getAllUsers).post(newUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

router.route("/:id/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
