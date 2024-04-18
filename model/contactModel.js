const mongoose = require("mongoose");
const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Enter the Full Name"],
    },

    email: {
      type: String,
      required: [true, "Add user email address"],
      unique: [true, "Email address already exist"],
    },
    phone: {
      type: String,
      required: [true, "Enter the user Phone No"],
    },
    gender: {
      type: String,
      required: [true, "Please add the gender"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
