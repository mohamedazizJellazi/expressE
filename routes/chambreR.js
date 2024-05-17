const express = require("express");
const router = express.Router();
const chambreController = require("../controller/chambreController");





router.post("/add/:id",  chambreController.add);
router.get("/list",  chambreController.getall);
router.put("/reserve/:id",  chambreController.reserve);
router.get("/reservation", (req, res, next) => {
    res.render("reservation");
  });



module.exports = router;
