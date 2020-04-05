import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'; 

const Burger = props => {
    const ingredients = props.ingredients;
    let transformedIngredients = [];
    const ingredientList = ['bacon', 'lettuce', 'tomato', 'cheese', 'meat'];
    for (const ingredient of ingredientList) {;
        for (let i = 0; i < ingredients[ingredient]; i++) {
            transformedIngredients.push(
                <BurgerIngredient key={ingredient + i} type={ingredient} />
            );
        }
    }
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    // const transformedIngredients = Object.keys(props.ingredients)
    //     .map(ingredient => {
    //         return [...Array(props.ingredients[ingredient])].map((_, i) => {
    //             return  <BurgerIngredient key={ingredient + i} type={ingredient}/>;
    //         });
    //     });
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default Burger;