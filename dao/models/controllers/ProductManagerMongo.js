import productModel from "../product.model.js";

export class ProductManagerMongo {
    constructor(){
        this.model = productModel
    }
    //Mostrar todos los productos
    async getProducts(){
        try {
            return await this.model.find({})   
        } catch (error) {
            console.error("Error al mostrar los productos", error);
        }
    }
    //Mostrar un producto por id
    async getProduct(pid){
        return await this.model.findOne({_id: pid})
    }
    //Agregar un nuevo producto a la base de datos
    async addProduct(newProduct){
        return await this.model.create(newProduct)
    }
    //Editar un producto existente
    async updateProduct(pid, updatedProduct){
        return await this.model.updateOne({_id: pid}, updatedProduct)
    }
    //Borrar un producto existente
    async deleteProduct(pid){
        return await this.model.deleteOne({_id: pid})
    }
}


