import express from 'express';
import mongoose from "mongoose";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import router from './routes/routesMongo/products.router.js';
import cartRouter from './routes/routesMongo/carts.router.js';
import { chatRouter, chatMM } from "./routes/routesMongo/chatMongo.router.js"
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import path from 'path';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import sessionRouter from "./routes/routesMongo/sessions.router.js"; 
import passport from 'passport';
import cookieParser from 'cookie-parser';
import initializePassport from './config/passport.config.js';
import utils from './utils.js';

const { passportCall } = utils;

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

// Middleware para manejar solicitudes JSON
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

// Middleware de sesión con Passport
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://pauscalzo:Eloisa2014Amanda2017@clustercoder.wvj1vet.mongodb.net/ecommerce?retryWrites=true&w=majority",
        ttl: 60 * 60 
    }),
    secret: "12345678",
    resave: false,
    saveUninitialized: false
}));

// Configuración de Passport
initializePassport();
app.use(passport.initialize());


// Agregar console.log para verificar la ejecución de las rutas y middlewares de autenticación
app.use((req, res, next) => {
    console.log(`Solicitud recibida: ${req.method} ${req.url}`);
    next();
});

// Agregar console.log para verificar si las cookies se están enviando correctamente
app.use((req, res, next) => {
    console.log("Cookies:", req.cookies);
    next();
});

// Endpoint para registrar un nuevo usuario
app.post("/signup", passport.authenticate("signup", {
    successRedirect: "/login",
    failureRedirect: "/failregister"
}));

// Endpoint para iniciar sesión
app.post("/login", passport.authenticate("login", {
    successRedirect: "/current",
    failureRedirect: "/faillogin"
}));


// Endpoint para cerrar sesión
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
});

// Ruta para las sesiones
app.use("/api/sessions", sessionRouter);

//Routes
app.use("/", router)
app.use('/carts', cartRouter);
app.use('/api/chat', chatRouter);

// Rutas de autenticación
app.get('/current', passportCall('login'), (req, res) => {
    res.send(req.user);
});

// Manejo de errores para rutas de inicio de sesión fallidas
app.get("/failregister", (req, res) => {
    console.log("Registro fallido")
    res.status(400).send({ error: "Fallo en el registro" })
});

app.get("/faillogin", (req, res) => {
    console.log("Login fallido")
    res.status(400).send({ error: "Fallo en el login" })
});

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


