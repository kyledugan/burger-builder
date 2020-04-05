export const authStart = () => {
    return {
        type: 'AUTH_START',
    };
};

export const authSuccess = (token, id) => {
    return {
        type: 'AUTH_SUCCESS',
        token: token,
        userId: id
    };
};

export const authFail = error => {
    return {
        type: 'AUTH_FAIL',
        error: error
    };
};

export const logout = () => {
    return {
        type: 'INITIATE_LOGOUT'
    };
};

export const logoutSuccess = () => {
    return {
        type: 'LOGOUT'
    }
};

export const checkAuthTimeout = expirationTime => {
    return {
        type: 'AUTH_CHECK_TIMEOUT',
        expirationTime: expirationTime
    };
};

export const auth = (email, password, method) => {
    return {
        type: 'AUTH_USER',
        email: email,
        password: password,
        method: method
    };
};

export const setAuthRedirect = path => {
    return {
        type: 'SET_AUTH_REDIRECT',
        path: path
    };
};

export const authCheckState = () => {
    return {
        type: 'AUTH_CHECK_STATE'
    };
};