const express = require("express");
const http = require("http");
const mongo = require("mongoose");
const bodyParser = require("body-parser");
const mongoconnection = require("./config/mongoconnection.json");
var path = require("path");

mongo
  .connect(mongoconnection.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((err) => {
    console.log(err);
  });

var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const hotelRouter = require("./routes/hotelR");
const validate = require("./midill/validate");
app.use("/hotels", hotelRouter,validate);
const chambreRouter = require("./routes/chambreR");
const chambre = require("./modele/chambre");
const chambreC=require("./controller/chambreController")
app.use("/chambres", chambreRouter);
const server = http.createServer(app);
const io = require("socket.io")(server);
io.on("connection", async (socket) => {
  console.log("User connected");
  socket.on("afficheC",async(data)=>{
    let ChambreN=await chambre.find({hotel:data,reservee : "false"})
    socket.emit("listC",JSON.stringify(ChambreN))
  })
  socket.on("reserver",async(data)=>{
    console.log(data) 
    await chambreC.reserveS(data.idC,data.nom_client)
    // socket.emit("listC",JSON.stringify(ChambreN))
  })
  
  
 

  socket.on("disconnect", () => {
    io.emit("msg", "An user is diconnected");
  });
});



server.listen(3000, () => console.log("server is run"));
