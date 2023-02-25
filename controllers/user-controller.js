const { Thought, User } = require("../models");

module.exports = {
  //gets all users and populates the users along with their thoughts
  getAllUsers(req, res) {
    User.find()
      .populate("thoughts")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //brings back a single user and that user's thoughts.
  getUser(req, res) {
    User.findOne({ _id: req.params.id })
      .select("-__v")
      .populate("thoughts")
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // creates a new user.
  newUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // updates a specific user.
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //deletes a user.

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) => res.json({ message: "User deleted successfully" }))
      .catch((err) => res.status(500).json(err));
  },
  //Creates a friend of a user.
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //Deletes a friend for a user.
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
};
