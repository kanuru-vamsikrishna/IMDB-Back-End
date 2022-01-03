const Actor = require("../models/Actors");
const Movies = require("../models/Movies");

module.exports.Create = (req, res) => {
  const body = req.body;
  console.log(body);
  const actor = new Actor(body);
  actor
    .save()
    .then((actor) => {
      res.status(200).json({
        status: 200,
        response: actor,
        message: "Actor registerd successfully",
      });
    })
    .catch((err) => {
      res.status(403).json({
        status: 403,
        response: err,
        message: "Failed to create actor",
      });
    });
};

module.exports.List = (req, res) => {
  Actor.find()
    .then((actor) => {
      res.status(200).json({
        status: 200,
        response: actor,
        message: "Fetched Actors successfully",
      });
    })
    .catch((err) => {
      res.status(403).json({
        status: 403,
        response: err,
        message: "Failed to fetch actors",
      });
    });
};

module.exports.BasedonId = (req, res) => {
  const id = req.params.id;
  Actor.findById(id)
    .then((actor) => {
      if (actor) {
        res.status(200).json({
          status: 200,
          response: actor,
          message: "Fetched an actor successfully",
        });
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.status(403).json({
        status: 403,
        response: err,
        message: "Failed to fetch actor",
      });
    });
};

module.exports.Update = (req, res) => {
  const id = req.params.id;
  console.log(id, "id");
  const body = req.body;
  console.log(body, "body");
  Actor.findByIdAndUpdate({ _id: id }, body, { new: true, runValidators: true })
    .then((actor) => {
      if (actor) {
        res.status(200).json({
          status: 200,
          response: actor,
          message: "Successfully updated  actor",
        });
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.status(403).json({
        status: 403,
        response: err,
        message: "Failed to update actor",
      });
    });
};

module.exports.Delete = (req, res) => {
  const id = req.params.id;
  Actor.findById(id)
    .then((actor) => {
      const actorId = actor._id;
      const movies = actor.movies;
      if (movies.length > 0) {
        movies.forEach((movie, i) => {
          if (i == movies.length - 1) {
            Movies.findByIdAndUpdate(
              { _id: movie },
              { $pull: { actors: actorId } },
              { new: true, runValidators: true }
            ).then(() => {
              Actor.findByIdAndDelete(id)
                .then((actor) => {
                  if (actor) {
                    return res.status(200).json({
                      status: 200,
                      response: actor,
                      message: "Successfully deleted  actor",
                    });
                  } else {
                    res.json({});
                  }
                })
                .catch((err) => {
                  return res.status(403).json({
                    status: 403,
                    response: err,
                    message: "Failed to delete actor",
                  });
                });
            });
          } else {
            Movies.findByIdAndUpdate(
              { _id: movie },
              { $pull: { actors: actorId } },
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
        Actor.findByIdAndDelete(id)
          .then((actor) => {
            if (actor) {
              return res.status(200).json({
                status: 200,
                response: actor,
                message: "Successfully deleted  actor",
              });
            } else {
              res.json({});
            }
          })
          .catch((err) => {
            return res.status(403).json({
              status: 403,
              response: err,
              message: "Failed to delete actor",
            });
          });
      }
    })
    .catch((err) => {
      res.status(403).json({
        status: 403,
        response: err,
        message: "Failed to delete actor",
      });
    });
};
