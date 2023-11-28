const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
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


const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
