import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerActions from '../../store/burger/burgerActions';
import * as ordersActions from '../../store/orders/ordersActions';
import classes from './BurgerBuilder.module.css';

const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);
    
    const ingredients = useSelector(state => state.burger.ingredients);
    const price = useSelector(state => state.burger.price);
    const error = useSelector(state => state.burger.error);
    const ingredientPrices = useSelector(state => state.burger.ingredientPrices);

    const dispatch = useDispatch();
    const onInitBurger = useCallback((ingredients, ingredientPrices, basePrice) => dispatch(burgerActions.initBurger(ingredients, ingredientPrices, basePrice)), [dispatch]);
    const onFinishBurger = () => dispatch(burgerActions.finishBurger());
    const onAddIngredient = ingredient => dispatch(burgerActions.addIngredient(ingredient));
    const onRemoveIngredient = ingredient => dispatch(burgerActions.removeIngredient(ingredient));
    const onInitPurchase = () => dispatch(ordersActions.purchaseInit());
    const onReset = () => dispatch(burgerActions.resetBurger());

    useEffect(() => {
        onInitBurger(ingredients, ingredientPrices, price);
    }, [onInitBurger, ingredients, ingredientPrices, price]) 

    const isPurchaseable = () => {
        return Object.values(ingredients).some(amount => amount > 0);
    }

    const purchaseHandler = () => {
        setPurchasing(true);
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        onFinishBurger();
        props.history.push('/checkout');
    }

    const resetHandler = () => {
        onReset();
    }

    const disabledInfo = {
        ...ingredients
    }
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;

    let burger = error ? <p>Ingredients can't be loaded.</p> : <Spinner />;

    if (ingredients) {
        burger = (
            <div className={classes.Layout}>
                <Burger ingredients={ingredients}/>
                <BuildControls 
                    ingredientAdded={ingredient => onAddIngredient(ingredient)}
                    ingredientRemoved={ingredient => onRemoveIngredient(ingredient)}
                    disabled={disabledInfo}
                    price={price ? price.toFixed(2) : null}
                    purchaseable={isPurchaseable(ingredients)}
                    ordered={purchaseHandler}
                    reset={resetHandler}
                />
            </div>
        )
        orderSummary = (
            <OrderSummary 
                ingredients={ingredients}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
                price={price ? price.toFixed(2) : null} >
            </OrderSummary>);
    }

    return (
        <Fragment>
            <Modal 
                show={purchasing}
                modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Fragment>
    )
}

export default withErrorHandler(BurgerBuilder, axios);