const { Schema, Types, model } = require("mongoose");
const { thoughtSchema } = require("./Thought");
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please use a valid email address.",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectID,
        ref: "Thought",
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },

  {
    toJSON: {
      virtuals: true,
    },

    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;