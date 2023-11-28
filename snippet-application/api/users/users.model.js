const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      lowercase: true,
    },
    lastName: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      unique:true,
      lowercase: true,
    },
    phoneNumber: {
      type: Number,
    },
    password: {
      type: String,
      lowercase: true,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);
// userSchema.virtual("snippets", {
//   ref: "Snippet",
//   localField: "_id",
//   foreignField: "user_id",
// });

// userSchema.virtual("bookmarks", {
//   ref: "Bookmark",
//   localField: "_id",
//   foreignField: "user_id",
// });

const User = mongoose.model("Patient", userSchema);

module.exports = User;
