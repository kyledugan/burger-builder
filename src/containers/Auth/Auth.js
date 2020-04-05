import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/auth/authActions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/utility';

const Auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email Address',
            },
            value: '',
            validation: {
                required: true
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
                required: true
            },
            valid: false
        }
    })
    const [shouldValidate, setShouldValidate] = useState(false);

    const inputChangedHandler = (event, input) => {
        const updatedForm = JSON.parse(JSON.stringify(controls));
        updatedForm[input]['value'] = event.target.value;
        updatedForm[input]['valid'] = checkValidity(event.target.value, controls[input]['validation']);
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
    
    let form = formElements.map(element => (
        <Input 
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            invalid={!element.config.valid}
            shouldValidate={shouldValidate}
            changed={(event) => inputChangedHandler(event, element.id)} />
    ));

    if (props.loading) {
        form = <Spinner/>;
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p style={{color: 'red'}}>{props.error.message.replace(/_/g, ' ')}</p>
        );
    }

    let authRedirect = null;
    if (props.isAuthenticated && props.purchasing) {
        authRedirect = <Redirect to='/checkout' />
    } else if (props.isAuthenticated) {
        authRedirect = <Redirect to='/' />
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form noValidate onSubmit={(event) => submitHandler(event)}>
                {form}
                <Button type='Success'>SIGN IN</Button>
                <Link className={classes.Link} to='/register'>REGISTER</Link>
            </form>
        </div>
    );
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: (state.auth.token !== null),
    purchasing: state.burger.purchasing
})

const mapDispatchToProps = dispatch => ({
    onAuth: (email, password) => dispatch(actions.auth(email, password, 'signIn'))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth);