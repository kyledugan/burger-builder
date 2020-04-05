const initialState = {
    ingredients: null,
    ingredientPrices: null,
    error: false,
    basePrice: null,
    price: null,
    purchasing: true
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_INGREDIENTS':
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                purchasing: false
            }
        case 'SET_INGREDIENT_PRICES':
            return {
                ...state,
                ingredientPrices: action.ingredientPrices,
                error: false
            }
        case 'SET_BASE_PRICE':
            return {
                ...state,
                basePrice: action.basePrice,
                price: action.basePrice
            }
        case 'ADD_INGREDIENT':
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] + 1
                },
                price: state.price + state.ingredientPrices[action.ingredient],
            }
        case 'REMOVE_INGREDIENT':
            if (state.ingredients[action.ingredient] <= 0) {
                return state;
            } else {
                return {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredient]: state.ingredients[action.ingredient] - 1
                    },
                    price: state.price - state.ingredientPrices[action.ingredient]
                }
            }
        case 'INIT_BURGER_FAILED':
            return {
                ...state,
                error: true
            }
        case 'FINISH_BURGER':
            return {
                ...state,
                purchasing: true
            }
        case 'RESET_BURGER':
            let noIngredients = {...state.ingredients};
            for (let ingredient in noIngredients) {
                noIngredients[ingredient] = 0;
            }
            return {
                ...state,
                ingredients: noIngredients,
                error: false,
                purchasing: false,
                price: state.basePrice
            }
        default:
            return state;
    }
}

export default reducer;