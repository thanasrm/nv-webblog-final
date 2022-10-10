const { Order } = require('../models')
module.exports = {
    // get all Order
    async index(req, res) {
        try {
            const orders = await Order.findAll()
            res.send(orders)
        } catch (err) {
            res.status(500).send({
                error: 'The Orders information was incorrect'
            })
        }
    },
    // create Order
    async create(req, res) {
        console.log(JSON.stringify(req.body))
        try {
            const order = await Order.create(req.body)
            res.send(order.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create Order incorrect'
            })
        }
    },
    // edit Order, suspend, active
    async put(req, res) {
        try {
            await Order.update(req.body, {
                where: {
                    id: req.params.orderId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update Order incorrect'
            })
        }
    },
    
// delete Order
async remove(req, res) {
        try {
            const order = await Order.findOne({
                where: {
                    id: req.params.orderId
                }
            })
            if (!order) {
                return res.status(403).send({
                    error: 'The Order information was incorrect'
                })
            }
            await order.destroy()
            res.send(order)
        } catch (err) {
            res.status(500).send({
                error: 'The Order information was incorrect'
            })
        }
    },
    // get Order by id
    async show(req, res) {
        try {
            const order = await Order.findByPk(req.params.orderId)
            res.send(order)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'The Order information was incorrect'
            })
        }
    }
}
