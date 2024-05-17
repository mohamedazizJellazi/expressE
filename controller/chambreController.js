const express = require("express");
const chambre=require("../modele/chambre");
const hotel = require("../modele/hotel");



async function getall(req, res) {
  try {
    const data = await chambre.find();
    
    res.send(data);
  } catch (err) {
    res.send(err);
  }
}




async function add(req, res, next) {
  try {
 
    const Chambre = new chambre(req.body);
   
    Chambre.reservee=false
    Chambre.nom_client=""
    Chambre.hotel=req.params.id
    await Chambre.save();
    const Hotel=await hotel.findById(req.params.id)
    await hotel.findByIdAndUpdate(req.params.id,{nbrChambre:Hotel.nbrChambre+1})
    res.status(200).send("add success");

   
  } catch (err) {
    res.status(400).send({ error: err.toString() });
  }
}
async function reserve(req, res, next) {
    try {
    await chambre.findByIdAndUpdate(req.params.id,{reservee:"true",nom_client:req.body.nom_client})
      
      res.status(200).send("chambre reserve");
  
     
    } catch (err) {
      res.status(400).send({ error: err.toString() });
    }
  }
  async function reserveS(id,nom_client) {
    try {
    await chambre.findByIdAndUpdate(id,{reservee:"true",nom_client:nom_client})
      
      
  
     
    } catch (err) {
      res.status(400).send({ error: err.toString() });
    }
  }

module.exports={add,getall,reserve,reserveS}