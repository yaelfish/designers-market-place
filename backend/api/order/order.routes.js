const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const { addOrder, getOrders, deleteOrder, editOrder, getOrderById } = require('./order.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getOrders)
router.get('/:id', getOrderById)
router.post('/', requireAuth, addOrder)
router.delete('/:id', requireAuth, deleteOrder)
router.put('/:id', requireAuth, editOrder)

module.exports = router