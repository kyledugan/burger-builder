const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_START':
            return {
                ...state,
                error: null,
                loading: true
            };
        case 'AUTH_SUCCESS':
            return {
                ...state,
                error: null,
                loading: false,
                userId: action.userId,
                token: action.token
            };
        case 'AUTH_FAIL':
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case 'LOGOUT':
            return {
                ...state,
                token: null,
                userId: null
            }
        default:
            return state;
    }
};

export default reducer;