import { Router } from "express";
import passport from "passport";

const router = Router();

//sign up and login passport local

router.post("/signup", passport.authenticate("signup", { 
    failureRedirect: "/failregister" 
}), async (req, res) => {
    res.redirect("/login"); 
});

router.get("/failregister", async (req, res) => {
    console.log("Registro fallido")
    res.status(400).send({ error: "Fallo en el registro" })
});

router.post("/login", passport.authenticate("login", {
    failureRedirect: "/faillogin"}), async (req, res) => {
        if (!req.user) return res.status(400).send({status:"error", error:"invalid credentials"})
        req.session.user = {
            first_name : req.user.first_name,
            last_name : req.user.last_name,
            email : req.user.email
        }
        res.redirect("/products");
});

router.get("/faillogin", async (req, res) => {
    console.log("Login fallido")
    res.status(400).send({ error: "Fallo en el login" })
});

//sign up and login github

router.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"]})
)

router.get(
    "/callback",
    passport.authenticate("github", { failureRedirect: '/login' }), async (req,res)=>{
        req.session.user = req.user
        res.redirect("/products");
    })


router.get("/signout", async (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login")
    })
});


export default router