import React, { Fragment } from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';

const CheckoutSummary = (props) => {
    let buttons = (
        <Fragment>
            <Button 
                type="Danger" 
                clicked={props.checkoutCancelled}>EDIT ORDER</Button>
            <Link
                className={classes.Link}
                to='/auth'>SIGN IN</Link>
            <Button 
                type="Success" 
                clicked={props.checkoutContinued}>CHECKOUT AS GUEST</Button>
        </Fragment>
    );
    if (props.authenticated) {
        buttons = (
            <Fragment>
                <Button 
                    type="Danger" 
                    clicked={props.checkoutCancelled}>CANCEL</Button>
                <Button 
                    type="Success" 
                    clicked={props.checkoutContinued}>CONTINUE</Button>
            </Fragment>
        );
    }

    return (
        <div className={classes.CheckoutSummary}>
            <h1>Review Order</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger style={{float: 'top'}} ingredients={props.ingredients} />
            </div>
            <h3 style={{float: 'top'}}>${props.price.toFixed(2)}</h3>
            {buttons}
        </div>
    );
}

const mapStateToProps = state => ({
    price: state.burger.price,
    authenticated: state.auth.token !== null
})

export default connect(mapStateToProps)(CheckoutSummary);