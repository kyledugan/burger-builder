import React from 'react';
import classes from './Order.module.css';

const Order = props => {
    const ingredients = [];
    for (let ingredient in props.ingredients) {
        ingredients.push(
            {
                name: ingredient, 
                amount: props.ingredients[ingredient]
            });
    }

    const ingredientOutput = ingredients.map(ingredient => {
        return ingredient.amount > 0 ? 
                <span 
                    key={ingredient.name}
                    style={{
                        textTransform: 'capitalize', 
                        display: 'inline-block', 
                        margin: '8px',
                        border: '1px solid #ccc',
                        padding: '5px'
                    }}>{ingredient.name} ({ingredient.amount}) 
                </span> 
                : null
    });

    return (
        <div className={classes.Order} >
            <p><strong>{props.time}</strong></p>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price <strong>${props.price}</strong></p>
        </div>
    );
};

export default Order;