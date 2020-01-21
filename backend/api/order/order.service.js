
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function getOrders(filterBy) {
   
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('Order')
    try {
        const ordersToshow = await collection.find(criteria).toArray();
        return ordersToshow
    } catch (err) {
        console.log('ERROR: cannot find orders');
        throw err;
    }
}


async function getOrderById(OrderId) {
    const collection = await dbService.getCollection('Order')
    try {
        const order = await collection.findOne({ "_id": ObjectId(OrderId) })
        return order
    } catch (err) {
        console.log(`ERROR: cannot find order ${OrderId}`)
        throw err;
    }
}


async function editOrder(editedOrder) {
    const collection = await dbService.getCollection('Order')
    try {
        const orderId = editedOrder._id;
        delete editedOrder._id;
        await collection.updateOne({ "_id": ObjectId(orderId) }, { $set: editedOrder })
        editedOrder._id = orderId
        return editedOrder
    } catch (err) {
        console.log(`ERROR: cannot update order ${editedOrder._id}`, err)
        throw err;
    }
}



async function addOrder(newOrder) {
    const collection = await dbService.getCollection('Order')
    try {
        await collection.insertOne(newOrder);
        return newOrder;
    } catch (newOrder) {
        console.log(`ERROR: cannot insert order`)
        throw err;
    }
}

async function deleteOrder(orderId) {
    const collection = await dbService.getCollection('Order')
    try {
        return await collection.deleteOne({ "_id": ObjectId(orderId) })
    } catch (err) {
        console.log(`ERROR: cannot remove order ${orderId}`)
        throw err;
    }
}

function _buildCriteria(filterBy) {

    const criteria = {};

    
    if (filterBy.name) {
        criteria.name = { $regex: `.*${filterBy.name}.*`, $options : 'i' };
    }

    if (filterBy.artist) {
        criteria["artist.fullName"] = { $regex: `.*${filterBy.artist}.*`, $options : 'i' };
    }

    if (filterBy.tags) {
        criteria.tags =  { $regex: `.*${filterBy.tags}.*`, $options : 'i' };
    }

    console.log(criteria)


    return criteria;
}

module.exports = {
    deleteOrder,
    addOrder,
    getOrderById,
    editOrder,
    getOrders,
    toggleLikeOrder
};