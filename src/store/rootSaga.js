import { 
    logoutSaga, 
    checkAuthTimeoutSaga, 
    authUserSaga, 
    authCheckStateSaga 
} from './auth/authSaga';
import { initBurgerSaga } from './burger/burgerSaga';
import { 
    purchaseBurgerSaga,
    purchaseBurgerGuestSaga,
    getOrdersSaga
} from './orders/ordersSaga';
import { takeEvery, takeLatest, all } from 'redux-saga/effects';

function* watchAuth() {
    yield takeEvery('INITIATE_LOGOUT', logoutSaga);
    yield takeEvery('AUTH_CHECK_TIMEOUT', checkAuthTimeoutSaga);
    yield takeEvery('AUTH_USER', authUserSaga);
    yield takeEvery('AUTH_CHECK_STATE', authCheckStateSaga);
}

function* watchBurger() {
    yield takeEvery('INIT_BURGER', initBurgerSaga);
}

function* watchOrders() {
    yield takeLatest('PURCHASE_BURGER', purchaseBurgerSaga);
    yield takeLatest('PURCHASE_BURGER_GUEST', purchaseBurgerGuestSaga);
    yield takeEvery('GET_ORDERS', getOrdersSaga);
}

export default function* rootSaga() {
    yield all([
        watchAuth(),
        watchBurger(),
        watchOrders()
    ]);
};