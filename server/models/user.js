const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    job: String,
    mobile: { type: Number, required: true },
    place: String,
    dateOfBirth: Date,
    image: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);