const mongoose = require("mongoose");

const modelSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Model = mongoose.model("Model", modelSchema);

module.exports = Model;
