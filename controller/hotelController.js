const express = require("express");
const hotel=require("../modele/hotel")



async function getall(req, res) {
  try {
    const data = await hotel.find();
    
    res.send(data);
  } catch (err) {
    res.send(err);
  }
}

async function getbyid(req, res) {
  try {
    const data = await hotel.findById(req.params.id);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
}


async function add(req, res, next) {
  try {
 
    const Hotel = new hotel(req.body);
   
    Hotel.nbrChambre = 0
   
    await Hotel.save();
    res.status(200).send("add success");

   
  } catch (err) {
    res.status(400).send({ error: err.toString() });
  }
}
async function deleteById (req, res) {
    try {
      await hotel.findByIdAndRemove(req.params.id);
      res.send("deleted");
    } catch (err) {
      res.send(err);
    }
  }

module.exports={add,getall,getbyid,deleteById}