const express = require("express");
const router = express.Router();
const hotelController = require("../controller/hotelController");
const { validate } = require("../modele/hotel");




router.post("/add",  hotelController.add,validate);
router.get("/list",  hotelController.getall);
router.get("/getById/:id",hotelController.getbyid)
router.delete("/delete/:id",hotelController.deleteById)




module.exports = router;
