/* register.router.js
import express from "express";
import User from "../../dao/models/user.model.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        const user = new User({ first_name, last_name, email, password });
        await user.save();

        res.redirect("/api/sessions/login");

    } catch (error) {
        res.status(500).send("Error de registro");
    }
});

export default router;
*/
