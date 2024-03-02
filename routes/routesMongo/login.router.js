/* login.router.js

import express from 'express';

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Busca en la base de datos un usuario con el email proporcionado
        const user = await User.findOne({ email });

        // Si no se encuentra el usuario, redirige de vuelta al formulario de inicio de sesión
        if (!user) {
            return res.redirect("/api/sessions/login");
        }

        // Verifica si la contraseña proporcionada coincide con la almacenada en la base de datos
        const passwordMatch = await user.comparePassword(password);

        // Si las contraseñas no coinciden, redirige de vuelta al formulario de inicio de sesión
        if (!passwordMatch) {
            return res.redirect("/api/sessions/login");
        }

        // Si las credenciales son correctas, establece el usuario en la sesión
        req.session.user = user;

        // Redirige al usuario a la vista de productos
        res.redirect("/products");
    } catch (error) {
        console.error("Error de inicio de sesión:", error);
        res.status(500).send("Error de inicio de sesión");
    }
});


router.get("/profile", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/api/sessions/login");
    }

    const { first_name, last_name, email} = req.session.user;
    res.render("profile", { first_name, last_name, email});
});

export default router;

*/
