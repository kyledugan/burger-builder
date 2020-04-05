import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as orderActions from '../../../store/orders/ordersActions';
import * as burgerActions from '../../../store/burger/burgerActions';
import { checkValidity } from '../../../shared/utility';

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'State',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'ZIP Code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'delivery', displayValue: 'Delivery'},
                        {value: 'carryout', displayValue: 'Carry-out'}
                    ]
                },
                value: 'delivery',
                validation: {
                    required: true
                },
                valid: true
            }
    })
    const [shouldValidate, setShouldValidate] = useState(false);
    
    const orderHandler = event => {
        event.preventDefault(); //prevents sending a request which reloads the page
        setShouldValidate(true);

        let allValid = true;
        if (props.token) {
            let updatedOrderForm = JSON.parse(JSON.stringify(orderForm));
            updatedOrderForm['email']['valid'] = true;
            setOrderForm(updatedOrderForm);
        }
        for (let input in orderForm) {
            if (!orderForm[input]['valid']) {
                allValid = false;
                break;
            }
        }
        
        if (allValid) {
            const formData = {};
            for (let input in orderForm) {
                formData[input] = orderForm[input].value
            }
            const order = {
                time: Date(Date.now()),
                ingredients: props.ingredients,
                price: parseFloat(props.price).toFixed(2), //in a real app you should calculate price on the server to prevent user manipulation
                orderData: formData,
                userId: props.userId
            }

            if (props.token) {
                props.onOrderSubmit(order, props.token);
            } else {
                props.onOrderSubmitGuest(order);
            }
            props.onReset();
        }
    }

    const inputChangedHandler = (event, input) => {
        const updatedOrderForm = JSON.parse(JSON.stringify(orderForm));
        updatedOrderForm[input]['value'] = event.target.value;
        updatedOrderForm[input]['valid'] = checkValidity(event.target.value, orderForm[input]['validation']);
        setOrderForm(updatedOrderForm);
    }

    const formElements = [];
    for (let key in orderForm) {
        if (props.token === null || key !== 'email') {
            formElements.push({
                id: key,
                config: orderForm[key]
            })
        }
    }

    let form = (
        <form onSubmit={orderHandler}>
            {formElements.map(element => (
                <Input 
                    key={element.id}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    invalid={!element.config.valid}
                    shouldValidate={shouldValidate}
                    changed={(event) => inputChangedHandler(event, element.id)} />
            ))}
            <Button type='Success'>SUBMIT</Button>
        </form>
    );
    if (props.loading) {
        form = <Spinner />;
    } 
        
    return (
        <div className={classes.ContactData }>
            <h4>Billing Details</h4>
            {form}
        </div>
    );
}

const mapStateToProps = state => ({
    ingredients: state.burger.ingredients,
    price: state.burger.price,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
    onOrderSubmit: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token)),
    onOrderSubmitGuest: orderData => dispatch(orderActions.purchaseBurgerGuest(orderData)),
    onReset: () => dispatch(burgerActions.resetBurger())
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));