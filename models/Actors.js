const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const actorSchema = new Schema({
  image: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
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

const Actor = mongoose.model("Actor", actorSchema);

module.exports = Actor;
