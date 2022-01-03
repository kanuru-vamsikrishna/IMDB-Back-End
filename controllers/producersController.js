const Producers = require("../models/Producers");

module.exports.Create = (req, res) => {
  const body = req.body;
  const producer = new Producers(body);
  producer
    .save()
    .then((producer) => {
      res.status(200).json({
        status: 200,
        response: producer,
        message: "Successfully created producer",
      });
    })
    .catch((err) => {
      res.status(403).json({
        status: 403,
        response: err,
        message: "Failed to create producer",
      });
    });
};

module.exports.List = (req, res) => {
  Producers.find()
    .then((producer) => {
      res.status(200).json({
        status: 200,
        response: producer,
        message: "Fetched producers successfully",
      });
    })
    .catch((err) => {
      res.status(403).json({
        status: 403,
        response: err,
        message: "Failed to fetch producers",
      });
    });
};

module.exports.BasedonId = (req, res) => {
  const id = req.params.id;
  Producers.findById(id)
    .then((producer) => {
      if (producer) {
        res.status(200).json({
          status: 200,
          response: producer,
          message: "Fetched producer successfully",
        });
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.status(403).json({
        status: 403,
        response: err,
        message: "Failed to fetch producer",
      });
    });
};

module.exports.Update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Producers.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .then((producer) => {
      if (producer) {
        res.status(200).json({
          status: 200,
          response: producer,
          message: "Updated producer successfully",
        });
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.status(403).json({
        status: 403,
        response: err,
        message: "Failed to update producer",
      });
    });
};

module.exports.Delete = (req, res) => {
  const id = req.params.id;
  Producers.findByIdAndDelete(id)
    .then((producer) => {
      if (producer) {
        res.status(200).json({
          status: 200,
          response: producer,
          message: "Successfully deleted producer",
        });
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.status(403).json({
        status: 403,
        response: err,
        message: "Failed to delete producer",
      });
    });
};
