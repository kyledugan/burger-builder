import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from '../../../store/auth/authActions';
import * as burgerActions from '../../../store/burger/burgerActions';

const Logout = props => {
    const { onLogout, onReset } = props;
    
    useEffect(() => {
        onLogout();
        onReset();
    }, [onLogout, onReset]) 

    return (
        <Redirect to='/' />
    );
};

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(authActions.logout()),
    onReset: () => dispatch(burgerActions.resetBurger())
})

export default connect(null, mapDispatchToProps)(Logout);