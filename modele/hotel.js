const mongo = require("mongoose");
const Schema = mongo.Schema;
const Hotel = new Schema({
  nom: String,
  nbrChambre: Number,
  email: String,
  adresse: String,
 
});

module.exports = mongo.model("hotel", Hotel);
