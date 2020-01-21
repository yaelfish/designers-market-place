const logger = require('../../services/logger.service')
const orderService = require('./order.service')

async function getOrders(req, res) {
    try {

        const filterBy = req.query
        const orders = await orderService.getOrders(filterBy)
        res.send(orders)
    } catch (err) {
        logger.error('Cannot get orders', err);
        res.status(500).send({ error: 'cannot get orders' })
    }
}

async function getOrderById(req, res) {
    try {
        const order = await orderService.getOrderById(req.params.id)
        res.json(order);
    }
    catch (err) {
        res.status(500).json({ err })
        logger.error('Cannot get order', err);
    }
}
async function addOrder(req, res) {
    const order = req.body;
    try {
        const addedOrder = await orderService.addOrder(order)
        res.json(addedOrder);
    }
    catch (err) {
        res.status(500).json({ err })
        logger.error('Cannot add order', err);
    }
}

async function deleteOrder(req, res) {
    try {
        await orderService.deleteOrder(req.params.id)
        res.end();
    }
    catch (err) {
        res.status(500).json({ err })
        logger.error('Cannot delete order', err);
    }
}


async function editOrder(req, res) {
    const order = req.body;
    try {
        editedOrder = await orderService.editOrder(order)
        res.json(editedOrder);
    }
    catch (err) {
        res.status(500).json({ err })
        logger.error('Cannot edit order', err);
    }
}

module.exports = {
    getOrders,
    deleteOrder,
    addOrder,
    editOrder,
    getOrderById
}