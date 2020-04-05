export const purchaseBurgerSuccess = (id, orderData) => ({
    type: "PURCHASE_BURGER_SUCCESS",
    orderId: id,
    orderData: orderData
});

export const purchaseBurgerFail = (error) => ({
    type: "PURCHASE_BURGER_FAIL",
    error: error
});

export const purchaseBurgerStart = () => ({type: "PURCHASE_BURGER_START"});

export const purchaseBurger = (orderData, token) => ({
    type: 'PURCHASE_BURGER',
    orderData: orderData,
    token: token 
});

export const purchaseBurgerGuest = (orderData) => ({
    type: 'PURCHASE_BURGER_GUEST',
    orderData: orderData
});

export const purchaseInit = () => ({type: "PURCHASE_INIT"});

export const getOrdersSuccess = orders => ({
    type: 'GET_ORDERS_SUCCESS',
    orders: orders
});

export const getOrdersFail = error => ({
    type: 'GET_ORDERS_FAIL',
    error: error
});

export const getOrdersStart = () => ({type: 'GET_ORDERS_START'});

export const getOrders = (token, userId) => ({
   type: 'GET_ORDERS',
   token: token,
   userId: userId 
});