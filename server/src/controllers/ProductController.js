const { Product } = require('../models')
module.exports = {
    // get all Product
    async index(req, res) {
        try {
            const Products = await Product.findAll()
            res.send(Products)
        } catch (err) {
            res.status(500).send({
                error: 'The Products information was incorrect'
            })
        }
    },
    // create Product
    async create(req, res) {
        console.log(JSON.stringify(req.body))
        try {
            const Product = await Product.create(req.body)
            res.send(Product.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create Product incorrect'
            })
        }
    },
    // edit Product, suspend, active
    async put(req, res) {
        try {
            await Product.update(req.body, {
                where: {
                    id: req.params.ProductId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update Product incorrect'
            })
        }
    },
    
// delete Product
async remove(req, res) {
        try {
            const Product = await Product.findOne({
                where: {
                    id: req.params.ProductId
                }
            })
            if (!Product) {
                return res.status(403).send({
                    error: 'The Product information was incorrect'
                })
            }
            await Product.destroy()
            res.send(Product)
        } catch (err) {
            res.status(500).send({
                error: 'The Product information was incorrect'
            })
        }
    },
    // get Product by id
    async show(req, res) {
        try {
            const Product = await Product.findByPk(req.params.ProductId)
            res.send(Product)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'The Product information was incorrect'
            })
        }
    }
}
