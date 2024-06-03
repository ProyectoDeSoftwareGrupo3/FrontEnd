import  express  from "express";
import path from 'path';
import axios from 'axios';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Server
const app = express();
app.set("port",4000);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto",app.get("port"));

//Configuración
app.use(express.static(__dirname + "/public"));
app.use(express.json());


//Rutas
app.get("/", (req,res)=> res.sendFile(__dirname + "/pages/index.html"));
app.get("/login",(req,res)=> res.sendFile(__dirname + "/pages/login.html"));
app.get("/animalLIst",(req,res)=> res.sendFile(__dirname + "/pages/animalList.html"));
app.get("/formPage",(req,res)=> res.sendFile(__dirname + "/pages/formPage.html"));
