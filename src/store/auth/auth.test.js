import reducer from './authReducer';

describe("auth reducer", () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
        })
    })

    it('should store token upon log in', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false
        }, {
            type: 'AUTH_SUCCESS',
            token: 'some-token',
            userId: 'some-user-id'
        })).toEqual({
            token: 'some-token',
            userId: 'some-user-id',
            error: null,
            loading: false
        })
    })
})