const express = require("express");
const router = express.Router();
const upload = require("../middlewares/fileUpload");
const { registerRestaurant, getRestaurants, updateRestaurant } = require("../controllers/restaurantController");
const { verifyToken } = require("../middlewares/auth");

router.route("/restaurant").post(verifyToken,upload.single('selectedPic'), registerRestaurant);
router.route("/restaurants").get(getRestaurants);
router.route("/:id").put(verifyToken, upload.single('selectedPic'), updateRestaurant);

module.exports = router;