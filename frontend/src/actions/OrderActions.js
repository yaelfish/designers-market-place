import OrderService from '../service/OrderService';
import { loading, doneLoading } from './SystemActions';

export function loadOrders(filterBy) {
  return async dispatch => {
    try {
      const orders = await OrderService.query(filterBy);
      dispatch(_setOrders(orders));
  
    } catch (err) {
      console.log('OrderActions: err in loadOrders', err);
    }
  };
}

export function loadOrderById(orderId) {
  return async dispatch => {
    try {
      dispatch(loading());
      const currOrder = await OrderService.getById(orderId);
      dispatch(_setCurrOrder(currOrder));
    } catch (err) {
      console.log('OrderActions: err in loadOrderById', err);
    } finally {
      dispatch(doneLoading());
    }
  }
}

export function addOrder(addedOrder) {
  console.log('add order action acrivated');
  
  return async dispatch => {
    try {
      const order = await OrderService.add(addedOrder);
      dispatch(_addOrder(order));
    } catch (err) {
      console.log('OrderActions: err in addOrder', err);
    }
  };
}


export function removeOrder(orderId) {
  return async dispatch => {
    try {
      OrderService.remove(orderId)
      dispatch(_removeOrder(orderId));
    } catch (err) {
      console.log('OrderActions: err in removeOrder', err);
    }
  }
}


export function editOrder(order) {
  
  return async dispatch => {
    try {
      const editOrder = await OrderService.edit(order)
      dispatch(_editOrder(editOrder));
    } catch (err) {
      console.log('OrderActions: err in editOrder', err);
    }
  }
}



function _setOrders(orders) {
  return {
    type: 'SET_ORDERS',
    orders
  };
}

function _addOrder(order) {
  return {
    type: 'ORDER_ADD',
    order
  };
}

function _removeOrder(orderId) {
  return {
    type: 'ORDER_REMOVE',
    orderId
  };
}


function _editOrder(editedOrder) {
  return {
    type: 'ORDER_EDIT',
    editedOrder
  };
}



function _setCurrOrder(order) {
  return {
    type: 'CURR_ORDER',
    order
  }
}
