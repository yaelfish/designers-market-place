import HttpService from './HttpService';
// import { orderData } from './data/orders';

function query(filterBy = null) {
    return HttpService.get('order', filterBy);
  }

function remove(orderId) {
  return HttpService.delete(`order/${orderId}`);
}

async function add(order) {
  const addedOrder = await HttpService.post(`order`, order);
  return addedOrder;
}

function getById(orderId) {
  return HttpService.get(`order/${orderId}`);
}

async function edit(order) {
  console.log('order edit service',order);
  
  const editedArtWork = await HttpService.put(`order/${order._id}`, order);
  return editedArtWork;
}

export default {
  add,
  query,
  remove,
  edit,
  getById
};