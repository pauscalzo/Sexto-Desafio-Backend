import express from 'express';
import mongoose from "mongoose";
import productRouter from './routes/routesMongo/productsMongo.router.js';
import cartRouter from './routes/routesMongo/cartsMongo.router.js';
import { chatRouter, chatMM } from './routes/routesMongo/chatMongo.router.js';
import path from 'path';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const app = express();
const port = 8080;


//Handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + '/views') 
app.set('views engine', "handlebars")
app.use(express.static(__dirname + '/views'))
app.use(express.static(path.join(__dirname, "public")))

//Midlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/chat', chatRouter);

const httpServer = app.listen(port, () => console.log("servidor con express"))

//socket.io
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



mongoose.connect("mongodb+srv://pauscalzo:Eloisa2014Amanda2017@clustercoder.wvj1vet.mongodb.net/ecommerce?retryWrites=true&w=majority")
.then (() => {
    console.log ("Conectado a la Base de Datos")
})
.catch (error => {
    console.error ("Error al conectarse", error)
})



