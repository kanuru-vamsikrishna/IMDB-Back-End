const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const producersSchema = new Schema({
  image: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Others"],
  },
  bio: {
    type: String,
    required: true,
  },
  movies: [{ type: Schema.ObjectId, ref: "Movies" }],
});

const Producers = mongoose.model("Producers", producersSchema);

module.exports = Producers;
