import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Sidedrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const Sidedrawer = props => {
    let attachedClasses = [classes.Sidedrawer, classes.Close];
    if (props.show) {
        attachedClasses = [classes.Sidedrawer, classes.Open];
    }

    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.closed} />
            <div className={attachedClasses.join(' ')} onClick={props.closed} >
                <div className={classes.Logo}>
                    <Logo />    
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </Fragment>
    );
};

export default Sidedrawer;