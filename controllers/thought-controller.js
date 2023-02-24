const mongoose = require("mongoose");
const { User, Thought } = require("../models");

module.exports = {
  getAllThoughts(req, res) {
    Thought.find()
      .populate("reactions")
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No thought found." });
        } else {
          res.json(data);
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  getThoughtById(req, res) {
    console.log(req.params.thoughtId);
    Thought.findOne({ _id: req.params.id })
      .populate("reactions")

      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No thought found." });
        } else {
          res.json(data);
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  newThought(req, res) {
    console.log(`test: ${req.body}`);
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: thought.username },
          { $addToSet: { thoughts: thought } },
          { new: true }
        );
      })
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    console.log(req.params.id);
    Thought.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No thought found." });
        } else {
          res.json(data);
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id }, { $delete: req.body })

      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No thought found." });
        } else {
          res.json({ message: "Thought has been deleted." });
        }
      })

      .catch((err) => res.status(500).json(err));
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    )

      // .populate("reactions")

      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No reaction found." });
        } else {
          res.json(data);
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((data) => res.json({ message: "Reaction removed" }))
      .catch((err) => res.status(500).json(err));
  },
};
