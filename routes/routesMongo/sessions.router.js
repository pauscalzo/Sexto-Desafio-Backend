import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import utils from "../../utils.js";
import User from "../../dao/models/user.model.js";

const router = Router();

const { passportCall } = utils;

// Sign up con passport local
router.post("/signup", passport.authenticate("signup", { 
    failureRedirect: "/failregister" 
}), async (req, res) => {
    res.redirect("/login"); 
});

router.get("/failregister", async (req, res) => {
    console.log("Registro fallido");
    res.status(400).send({ error: "Fallo en el registro" });
});

// Login con passport JWT
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return res
                .status(401)
                .send({ status: 'error', message: 'El usuario no existe' });
        }
        const isValid = utils.isValidatePassword(user, password);
        console.log(isValid)

        if (!isValid) {
            return res
                .status(401)
                .send({ status: "error", message: "La contraseña es incorrecta"});
        }

        const tokenUser = {
            _id: user._id, // Asegúrate de incluir toda la información necesaria en el token
            email: user.email,
            name: user.first_name // Cambia a 'name' si 'first_name' es el nombre de usuario
        }

        const token = jwt.sign(tokenUser, "12345678", {expiresIn: "1d"});
        console.log(token)

        res
            .cookie("coderCookieToken", token, {
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true,
            })
            .send({status: "success", message: "logged"});
    } catch (error) {
        console.error(error); // Asegúrate de manejar los errores adecuadamente
        res.status(500).send({ status: "error", message: "Error en el servidor" });
    }
});

router.get("/current", passportCall("login"), (req, res) => {
    res.send(req.user);
});

router.get("/faillogin", async (req, res) => {
    console.log("Login fallido");
    res.status(400).send({ error: "Fallo en el login" });
});

router.get("/signout", async (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

export default router;
