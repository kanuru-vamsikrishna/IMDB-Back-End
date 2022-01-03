const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
  image: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  plot: {
    type: String,
    required: true,
  },
  actors: [{ type: Schema.ObjectId, ref: "Actor", required: true }],
  producer: {
    type: Schema.ObjectId,
    ref: "Producers",
    required: true,
  },
});

const Movies = mongoose.model("Movies", moviesSchema);

module.exports = Movies;
