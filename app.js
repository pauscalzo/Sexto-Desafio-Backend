import  express from 'express';
import mongoose from "mongoose";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import router from './routes/routesMongo/products.router.js';
import cartRouter from './routes/routesMongo/carts.router.js';
import { chatRouter, chatMM } from "./routes/routesMongo/chatMongo.router.js"
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import path from 'path';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express();
const port = 8080;

//Handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + '/views') 
app.set('view engine', "handlebars")
app.use(express.static(__dirname + '/views'))
app.use(express.static(path.join(__dirname, "public")))

//Midlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

//Routes
app.use("/" ,router)
app.use('/api/carts', cartRouter);
app.use('/api/chat', chatRouter);

const httpServer = app.listen(port, () => console.log("servidor con express"))

//Socket.io chat

const io = new Server(httpServer);

const users = {}

io.on("connection", (socket)=>{
    console.log("un usuario se ha conectado")
    socket.on("newUser", (username)=>{
        users[socket.id] = username
        io.emit("userConnected", username)
    })

    socket.on("chatMessage", async (data) => {
        const { username, message } = data;
        try {
            await chatMM.addChat(username, message);
            io.emit("message", { username, message });
        } catch (error) {
            console.error("Error al procesar el mensaje del chat:", error);
        }
    });

    socket.on("disconnect", ()=>{
        const username = users[socket.id]
        delete users[socket.id]
        io.emit("userDisconnected", username)
    })
})


const environment = async () => {
    await mongoose.connect("mongodb+srv://pauscalzo:Eloisa2014Amanda2017@clustercoder.wvj1vet.mongodb.net/ecommerce?retryWrites=true&w=majority")
        .then (() => {
            console.log ("Conectado a la Base de Datos")
        })
        .catch (error => {
            console.error ("Error al conectarse", error)
        })
}

environment ();

