const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const multer = require("multer");

const userController = require("../controllers/userControllers");
const authenticateUser = require("../middlewares/authenticate");
const actorController = require("../controllers/actorsController");
const producersController = require("../controllers/producersController");
const moviesController = require("../controllers/moviesController");

const Image = require("../models/ImageUploader");

// multer
const DIR = "./files/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuid.v4() + "-" + filename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post("/image", authenticateUser, upload.single("image"), (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const image = new Image({
    image: url + "/files/" + req.file.filename,
  });
  image
    .save()
    .then((result) => {
      res.status(201).json({
        message: "uploaded successfully",
        imageCreated: {
          _id: result._id,
          image: result.image,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/files/:filename", (req, res) => {
  const fileName = req.params.filename;
  res.sendFile(fileName, { root: "./files" });
});

// users crud
router.post("/user/register", userController.Create);
router.post("/user/login", userController.Login);
router.get("/user/account", authenticateUser, userController.Account);
router.delete("/user/logout", authenticateUser, userController.Delete);

// actors crud
router.post("/actor/create", authenticateUser, actorController.Create);
router.get("/actors", authenticateUser, actorController.List);
router.get("/actor/:id", authenticateUser, actorController.BasedonId);
router.put("/actor/:id", authenticateUser, actorController.Update);
router.delete("/actor/:id", authenticateUser, actorController.Delete);

// producers crud
router.post("/producer/create", authenticateUser, producersController.Create);
router.get("/producers", authenticateUser, producersController.List);
router.get("/producer/:id", authenticateUser, producersController.BasedonId);
router.put("/producer/:id", authenticateUser, producersController.Update);
router.delete("/producer/:id", authenticateUser, producersController.Delete);

// movies crud
router.post("/movie/create", authenticateUser, moviesController.Create);
router.get("/movies", authenticateUser, moviesController.List);
router.get("/movie/:id", authenticateUser, moviesController.BasedonId);
router.put("/movie/:id", authenticateUser, moviesController.Update);
router.delete("/movie/:id", authenticateUser, moviesController.Delete);

module.exports = router;
