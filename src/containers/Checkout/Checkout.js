import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

const Checkout = props => {
    const checkoutCancelledHandler = () => {
        props.history.push('/');
    }

    const checkoutContinuedHandler = () => {
        props.history.push('/checkout/contact-data');
    }

    let summary = <Redirect to='/' />
    if (props.ingredients) {
        const purchasedRedirect = props.purchased ? <Redirect to='/orders' /> : null;
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary 
                    ingredients={props.ingredients}
                    price={props.price}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler} />
                <Route 
                    path={props.match.url + '/contact-data'} 
                    component={ContactData} />
            </div>
        )
    }
    return summary;
}

const mapStateToProps = state => ({
    ingredients: state.burger.ingredients,
    purchased: state.order.purchased
})

export default connect(mapStateToProps)(Checkout);