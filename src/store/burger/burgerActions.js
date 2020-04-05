export const addIngredient = ingredient => ({
    type: 'ADD_INGREDIENT',
    ingredient: ingredient
});

export const removeIngredient = ingredient => ({
    type: 'REMOVE_INGREDIENT',
    ingredient: ingredient
});

export const setIngredients = ingredients => ({
    type: 'SET_INGREDIENTS',
    ingredients: ingredients
})

export const setIngredientPrices = prices => ({
    type: 'SET_INGREDIENT_PRICES',
    ingredientPrices: prices
})

export const setBasePrice = price => ({
    type: 'SET_BASE_PRICE',
    basePrice: price
})

export const initBurgerFailed = () => ({type: 'INIT_BURGER_FAILED'})

export const initBurger = (ingredients, ingredientPrices, basePrice) => ({
    type: 'INIT_BURGER',
    ingredients: ingredients,
    ingredientPrices: ingredientPrices,
    basePrice: basePrice
})

export const finishBurger = () => ({type: 'FINISH_BURGER'});

export const resetBurger = () => ({type: 'RESET_BURGER'});