const Movies = require("../models/Movies");
const Actor = require("../models/Actors");
const Producers = require("../models/Producers");

module.exports.Create = (req, res) => {
  const body = req.body;
  const movie = new Movies(body);
  movie
    .save()
    .then((movie) => {
      const movieId = movie._id;
      const producer = movie.producer;
      const actors = movie.actors;
      Producers.findByIdAndUpdate(
        { _id: producer },
        { $push: { movies: movieId } },
        { new: true, runValidators: true }
      )
        .then(() => {
          actors.forEach((actor, i) => {
            if (i == actors.length - 1) {
              Actor.findByIdAndUpdate(
                { _id: actor },
                { $push: { movies: movieId } },
                { new: true, runValidators: true }
              )
                .then(() => {
                  return res.json({
                    status: 200,
                    message: "Movie created successfully",
                    response: movie,
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              Actor.findByIdAndUpdate(
                { _id: actor },
                { $push: { movies: movieId } },
                { new: true, runValidators: true }
              )
                .then(() => {
                  console.log("added");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          });
        })
        .catch((err) => {
          res.status(403).json({
            status: 403,
            response: err,
            message: "Failed to create a movie",
          });
        });
    })
    .catch((err) => {
      res.status(403).json({
        status: 403,
        response: err,
        message: "Failed to create a movie",
      });
    });
};

module.exports.List = (req, res) => {
  Movies.find()
    .populate("actors")
    .populate("producer")
    .then((movie) => {
      res.status(200).json({
        status: 200,
        response: movie,
        message: "Successfully fetched movies",
      });
    })
    .catch((err) => {
      res.status(403).json({
        status: 403,
        response: err,
        message: "Unable to fetch movies",
      });
    });
};

module.exports.BasedonId = (req, res) => {
  const id = req.params.id;
  Movies.findById(id)
    .populate("actors")
    .populate("producer")
    .then((movie) => {
      if (movie) {
        res.status(200).json({
          status: 200,
          response: movie,
          message: "Successfully fetched movie",
        });
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.status(403).json({
        status: 403,
        response: err,
        message: "Failed to fetch movie",
      });
    });
};

module.exports.Update = (req, res) => {
  const id = req.params.id;
  console.log(id);
  const body = req.body;
  Movies.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .then((movie) => {
      if (movie) {
        res.status(200).json({
          status: 200,
          response: movie,
          message: "Successfully updated movie",
        });
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.status(403).json({
        status: 403,
        response: err,
        message: "Failed to update movie",
      });
    });
};

module.exports.Delete = (req, res) => {
  const id = req.params.id;
  Movies.findById(id)
    .then((movie) => {
      const movieId = movie._id;
      console.log(movieId);
      const producer = movie.producer;
      const actors = movie.actors;
      Producers.findByIdAndUpdate(
        { _id: producer },
        { $pull: { movies: movieId } },
        { new: true, runValidators: true }
      )
        .then(() => {
          if (actors.length > 0) {
            actors.forEach((actor, i) => {
              if (i == actors.length - 1) {
                Actor.findByIdAndUpdate(
                  { _id: actor },
                  { $pull: { movies: movieId } },
                  { new: true, runValidators: true }
                )
                  .then(() => {
                    Movies.findByIdAndDelete(id)
                      .then((movie) => {
                        if (movie) {
                          res.status(200).json({
                            status: 200,
                            response: movie,
                            message: "Successfully deleted movie",
                          });
                        } else {
                          res.json({});
                        }
                      })
                      .catch((err) => {
                        res.status(403).json({
                          status: 403,
                          response: err,
                          message: "Failed to delete movie",
                        });
                      });
                  })
                  .catch((err) => {
                    res.status(403).json({
                      status: 403,
                      response: err,
                      message: "Failed to delete movie",
                    });
                  });
              } else {
                Actor.findByIdAndUpdate(
                  { _id: actor },
                  { $pull: { movies: movieId } },
                  { new: true, runValidators: true }
                )
                  .then(() => {
                    console.log("removed");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            });
          } else {
            actors.forEach((actor, i) => {
              if (i == actors.length - 1) {
                Actor.findByIdAndUpdate(
                  { _id: actor },
                  { $pull: { movies: movieId } },
                  { new: true, runValidators: true }
                )
                  .then(() => {
                    Movies.findByIdAndDelete(id)
                      .then((movie) => {
                        if (movie) {
                          res.status(200).json({
                            status: 200,
                            response: movie,
                            message: "Successfully deleted movie",
                          });
                        } else {
                          res.json({});
                        }
                      })
                      .catch((err) => {
                        res.status(403).json({
                          status: 403,
                          response: err,
                          message: "Failed to delete movie",
                        });
                      });
                  })
                  .catch((err) => {
                    res.status(403).json({
                      status: 403,
                      response: err,
                      message: "Failed to delete movie",
                    });
                  });
              } else {
                Actor.findByIdAndUpdate(
                  { _id: actor },
                  { $pull: { movies: movieId } },
                  { new: true, runValidators: true }
                )
                  .then(() => {
                    console.log("removed");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            });
          }
        })
        .catch((err) => {
          res.status(403).json({
            status: 403,
            response: err,
            message: "Failed to delete movie",
          });
        });
    })
    .catch((err) => {
      res.status(403).json({
        status: 403,
        response: err,
        message: "Failed to delete movie",
      });
    });
};
