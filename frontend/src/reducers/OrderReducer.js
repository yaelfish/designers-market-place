const initialState = {
  orders: [],
  selectedOrder: {}
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_ORDERS':
      return { ...state, orders: action.orders };
    case 'ORDER_ADD':
      return { ...state, orders: [...state.orders, action.order] };
    case 'ORDER_EDIT':
      return {
        ...state,
        orders: state.orders.map(order =>
          order._id === action.order._id ? action.order : order
        )
      };
    case 'ORDER_REMOVE':
      return { ...state, orders: state.orders.filter(order => order._id !== action.orderId) }
    case 'CURR_ORDER':
      return {
        ...state, selectedOrder: action.order
      }
    default:
      return state;
  }
}
