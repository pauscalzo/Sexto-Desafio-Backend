import { Router } from "express";
import { UserManagerMongo } from "../../dao/models/controllers/UserManagerMongo.js"

const router = Router()

const u = new UserManagerMongo();

router.post("/signup", async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });   
    } 

    try {
        const createdUser = await u.createOne(req.body);
        res.redirect("/login");
    } catch (error) {
        res.status(500).json({ error }); 
    }
});


// 

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    try {
        const user = await u.findByEmail(email);
        if (!user) {
            return res.redirect("/signup");
        }
        
        // Comparar contraseñas directamente
        if (password !== user.password) {
            return res.status(400).json({ message: "La contraseña no es válida" });
        }

        const sessionInfo =
        email === "adminCoder@coder.com" && password === "adminCod3r123"
            ? {email, first_name: user.first_name, isAdmin: true}
            : {email, first_name: user.first_name, isAdmin: false}

        req.session.user = sessionInfo;
        res.redirect("/products");

    } catch (error) {
        console.error("Error al procesar la solicitud:", error); 
        res.status(500).json({ error });
    }
});

router.get("/signout", async (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login")
    })
});


export default router