const fs = require('fs')
const {product1, product2} = require('./products.js')

class ProductManager {
    constructor(path){
        this.path=path
    }
    async addProduct(product){
        if(product){
            const arrayProd = await this.getProducts()
            product.id=arrayProd.length + 1
            arrayProd.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(arrayProd))
            return product
        }else{
            return 'Datos incompletos, intentelo nuevamente'
        }
    }
    async getProducts(){
        if (fs.existsSync(this.path)) {
            const file = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(file)
        }else{
        return []
        }
    }
    async getProductById(id){
        const products = await this.getProducts()
        const producto = products.find(product=>product.id==id)
        if(producto){
            return producto
        }else{
        return 'Not found'
        }
    }
    async updateProduct(id, product){
        const arrayProd = await this.getProducts()
        if (arrayProd.length&&id&&product) {
            const updateArray = arrayProd.map( p => {
               if (p.id==id){
                    product.id=id
                   return product
                }else{
                    return p
                }
            })
            await fs.promises.writeFile(this.path, JSON.stringify(updateArray))
            return updateArray
        } else {
            return 'Error no se puede actualizar'
        }
    }
    async deleteProduct(id){
        const arrayProd = await this.getProducts()
        if (arrayProd.length&&id) {
            const newArray = arrayProd.filter(p=>p.id!=id)
            await fs.promises.writeFile(this.path, JSON.stringify(newArray))
            return (newArray);
        } else {
            return 'Error no se puede eliminar'
        }
    }
}

const productos = new ProductManager('./file.txt')
const test = async (test)=>{
    console.log(await test);
}



//---------------TEST--------------

//AGREGAR PRODUCTOS
//productos.addProduct(product1)
//productos.addProduct(product2)

//OBTENER TODOS LOS PRODUCTOS
//

//test(productos.getProducts())

//OBTENER PRODUCTO POR ID (PRODUCTO EXISTENTE)
//test(productos.getProductById(3))

//ACTUALIZAR PRODUCTO POR ID
//

//test(productos.updateProduct(4,product1))

//ELIMINAR PRODUCTO POR ID
//test(productos.deleteProduct(1))