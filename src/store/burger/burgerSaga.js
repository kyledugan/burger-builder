import { put } from 'redux-saga/effects';
import * as actions from './burgerActions';
import axios from '../../axios-orders';

export function* initBurgerSaga(action) {
    if (action.ingredients === null) {
        try {
            const res = yield axios.get('/ingredients.json');
            yield(put(actions.setIngredients(res.data)));
        } catch (err) {
            console.log(err);
            yield(put(actions.initBurgerFailed()));
        }
    }
    if (action.ingredientPrices === null) {
        try {
            const res = yield axios.get('/ingredientPrices.json');
            yield(put(actions.setIngredientPrices(res.data)));
        } catch (err) {
            console.log(err);
            yield(put(actions.initBurgerFailed()));
        }
    }
    if (action.basePrice === null) {
        try {
            const res = yield axios.get('/basePrice.json');
            yield(put(actions.setBasePrice(res.data)));
        } catch (err) {
            console.log(err);
            yield(put(actions.initBurgerFailed()));
        }
    }
}