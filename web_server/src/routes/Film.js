const express = require("express");
const path = require("path");
const {
  create,
  getAll,
  getById,
  update,
  remove,
  search,
  getType,
  addRating,
  setActor,
  filter,
  setType,
} = require("../controller/Film");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Create a unique filename
  },
});

const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } });

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  create
);
router.get("", getAll);
router.get("/filmId/:id", getById);
router.get("/search/:name", search);
router.get("/type/:name", getType);
router.put("/update/:id", update);
router.put("/rating", addRating);
router.delete("/:id", remove);
router.get("/filters", filter);
router.put("/actorId/:actorId", setActor);
router.put("/typeId/:typeId", setType);

module.exports = router;
