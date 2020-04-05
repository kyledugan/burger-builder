import React, { useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Register.module.css';
import * as actions from '../../store/auth/authActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/utility';

const Register = props => {
    const [controls, setControls] = useState({
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
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password',
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false
        },
        confirmPassword: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Confirm Password',
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
                confirmPassword: true
            },
            valid: false
        }
    });
    const [shouldValidate, setShouldValidate] = useState(false);

    const inputChangedHandler = (event, input) => {
        const updatedForm = JSON.parse(JSON.stringify(controls));
        updatedForm[input]['value'] = event.target.value;
        updatedForm[input]['valid'] = checkValidity(event.target.value, controls[input]['validation'], controls.password.value);
        if (input === 'password') {
            updatedForm.confirmPassword.valid = checkValidity(event.target.value, controls['confirmPassword']['validation'], controls.password.value)
        }
        setControls(updatedForm);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setShouldValidate(true);

        let allValid = true;
        for (let input in controls) {
            if (!controls[input]['valid']) {
                allValid = false;
                break;
            }
        }

        if (allValid) {
            props.onAuth(controls.email.value, controls.password.value);
        }
    }

    const formElements = [];
    for (let key in controls) {
        formElements.push({
            id: key,
            config: controls[key]
        })
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p style={{color: 'red'}}>{props.error.message.replace(/_/g, ' ')}</p>
        );
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to='/' />
    }
    
    const form = formElements.map(element => (
        <Input 
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            invalid={!element.config.valid}
            shouldValidate={shouldValidate}
            changed={(event) => inputChangedHandler(event, element.id)} />
    ));
    return (
        <div className={classes.Register}>
            {authRedirect}
            {errorMessage}
            <form noValidate onSubmit={(event) => submitHandler(event)}>
                {form}
                <Button type='Success'>REGISTER</Button>
            </form>
        </div>
    );
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: (state.auth.token !== null)
})

const mapDispatchToProps = dispatch => ({
    onAuth: (email, password) => dispatch(actions.auth(email, password, 'register'))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);