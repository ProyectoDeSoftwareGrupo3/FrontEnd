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
app.get("/signUp",(req,res)=> res.sendFile(__dirname + "/pages/signUp.html"));
app.get("/adopta",(req,res)=> res.sendFile(__dirname + "/pages/animalList.html"));
app.get("/formPage",(req,res)=> res.sendFile(__dirname + "/pages/formPage.html"));
app.get("/animalTransitForm",(req,res)=> res.sendFile(__dirname + "/pages/animalTransitForm.html"));
app.get("/submitAnimal",(req,res)=> res.sendFile(__dirname + "/pages/submitAnimal.html"));
app.get("/userProfile",(req,res)=> res.sendFile(__dirname + "/pages/userProfile.html"));
app.get("/administrador",(req,res)=> res.sendFile(__dirname + "/pages/administrador.html"));
app.get("/tables",(req,res)=> res.sendFile(__dirname + "/pages/tables.html"));
app.get("/panel",(req,res)=> res.sendFile(__dirname + "/pages/panel.html"));
app.get("/denuncia-el-maltrato",(req,res)=> res.sendFile(__dirname + "/pages/denuncia-el-maltrato.html"));
app.get("/contacto",(req,res)=> res.sendFile(__dirname + "/pages/contacto.html"));
app.get("/donaciones",(req,res)=> res.sendFile(__dirname + "/pages/donaciones.html"));
app.get("/transito",(req,res)=> res.sendFile(__dirname + "/pages/transito.html"));
app.get("/create-animals",(req,res)=> res.sendFile(__dirname + "/pages/create-animals.html"));


