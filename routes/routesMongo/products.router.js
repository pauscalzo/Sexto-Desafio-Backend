import express from 'express';
import { ProductManagerMongo } from '../../dao/models/controllers/ProductManagerMongo.js';

const router = express.Router()

const p = new ProductManagerMongo();

router.get('/', (req, res) => {
    res.redirect('/products?page=1');
});

router.get("/login", (req, res) => {
    if (req.session.user) {
        return res.redirect("/products")
    }
    res.render("login");
});

router.get("/signup", (req, res) => {
    if (req.session.user) {
        return res.redirect("/products")
    }
    res.render("signup");
});

router.get('/products', async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login")
    }
    console.log(req.session.user)
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const sortOrder = req.query.sort ? req.query.sort : null;
        const category = req.query.category ? req.query.category : null;
        const status = req.query.status ? req.query.status : null;

        const result = await p.getProducts(page, limit, sortOrder, category, status);
        const user = req.session.user;

        result.prevLink = result.hasPrevPage ? `/products?page=${result.prevPage}` : '';
        result.nextLink = result.hasNextPage ? `/products?page=${result.nextPage}` : '';
        result.isValid = !(page <= 0 || page > result.totalPages)

        res.render('products', { products: result.docs, user, ...result });

    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
});

router.get('/:pid', async (req, res) => {
    let { pid } = req.params;
    let result = await p.getProduct(pid);
    res.send({ result: "success", payload: result });
});

router.post("/", async (req, res) => {
    let { title, description, price, thumbnail, code, stock, category, status } = req.body;
    if (!title || !description || !price || !thumbnail || !code || !stock || !category || !status) {
        res.status(400).send({ status: "error", error: "faltan datos" });
        return;
    }
    let result = await p.addProduct({ title, description, price, thumbnail, code, stock, category, status });
    res.send({ result: "success", payload: result });
});

router.put("/:pid", async (req, res) => {
    try {
        let { pid } = req.params;
        let updatedProduct = req.body;
        let result = await p.updateProduct(pid, updatedProduct);
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).send({ error: error.message });
    }
});

router.delete("/:pid", async (req, res) => {
    let { pid } = req.params;
    let result = await p.deleteProduct(pid);
    res.send({ result: "success", payload: result });
});

export default router;