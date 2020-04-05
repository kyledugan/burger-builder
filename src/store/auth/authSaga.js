import { put, delay, call } from 'redux-saga/effects';
import * as actions from './authActions';
import axios from 'axios';
import config from '../../config.json';

export function* logoutSaga() {
    yield call([localStorage, 'clear'])
    // yield call([localStorage, 'removeItem'], 'token')
    // yield localStorage.clear();
    yield put(actions.logoutSuccess())
};

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
};

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + config.googleAPIKey;
    if (action.method === 'register') {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + config.googleAPIKey;
    }

    try {
        const res = yield axios.post(url, authData)
        const expirationTime = new Date(new Date().getTime() + res.data.expiresIn*1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationTime', expirationTime);
        localStorage.setItem('userId', res.data.localId);
        yield(put(actions.authSuccess(res.data.idToken, res.data.localId)));
        yield(put(actions.checkAuthTimeout(res.data.expiresIn)));
    } catch (error) {
        console.log(error.response);
        yield(put(actions.authFail(error.response.data.error)));
    }
}

export function* authCheckStateSaga() {
    const token = localStorage.getItem('token');
        if (!token) {
            yield(put(actions.logout()));
        } else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if (new Date() > expirationTime) {
                yield(put(actions.logout()));
            } else {
                const userId = localStorage.getItem('userId');
                yield(put(actions.authSuccess(token, userId)));
                yield(put(actions.checkAuthTimeout((expirationTime.getTime() - new Date().getTime())/1000)));
            }
        }
}