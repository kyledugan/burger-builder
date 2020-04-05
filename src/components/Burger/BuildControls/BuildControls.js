import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Bacon', type: 'bacon'},
    {label: 'Lettuce', type: 'lettuce'},
    {label: 'Tomato', type: 'tomato'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const BuildControls = props => (
    <div className={classes.BuildControls}>
        <p>$<strong>{props.price}</strong></p>
        {controls.map(control => {
            return <BuildControl 
                key={control.label} 
                label={control.label} 
                added={() => props.ingredientAdded(control.type)}
                removed={() => props.ingredientRemoved(control.type)}
                disabled={props.disabled[control.type]}/>
        })}
        <div className={classes.Buttons}>
            <button
                className={classes.ResetButton}
                onClick={props.reset}>RESET</button>
            <button 
                className={classes.OrderButton}
                disabled={!props.purchaseable}
                onClick={props.ordered}>ORDER</button>
        </div>
    </div>
)

export default BuildControls;