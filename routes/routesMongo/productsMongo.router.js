import { Router } from "express";
import { ProductManagerMongo } from "../../dao/models/controllers/ProductManagerMongo.js";

const productRouter = Router()
const productMM = new ProductManagerMongo()

productRouter.get ("/", async (req, res) => {
    try {
        let result = await productMM.getProducts()
        res.send ({result: "success", payload: result})
    } catch (error){
        console.error("Error al mostrar los productos", error);
    }
})

productRouter.get ('/:pid', async (req, res)=>{
    let {pid} = req.params
    let result = await productMM.getProduct(pid)
    res.send ({result: "success", payload: result})
})

productRouter.post ("/", async (req, res) => {
    let {title, description, price, thumbnail, code, stock, category, status} = req.body
    if (!title || !description || !price || !thumbnail || !code || !stock || !category || !status){
        res.send ({status: "error", error: "faltan datos"})
    }
    let result = await productMM.addProduct ({
        title, description, price, thumbnail, code, stock, category, status
    })
    res.send ({result: "success", payload: result})
})

productRouter.put("/:pid", async (req, res) => {
    try {
        let { pid } = req.params;
        let updatedProduct = req.body; 
        let result = await productMM.updateProduct(pid, updatedProduct);
        res.send({ result: "success", payload: result });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

productRouter.delete ("/:pid", async(req, res) => {
    let {pid} = req.params
    let result = await productMM.deleteProduct ({
        _id: pid
    })
    res.send ({result:"success", payload: result})
})

export default productRouter