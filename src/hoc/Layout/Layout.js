import React, { Fragment, useState } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';
import { connect } from 'react-redux';

const Layout = props => {
    const [showSidedrawer, setShowSidedrawer] = useState(false);

    const sidedrawerToggleHandler = () => {
        setShowSidedrawer(!showSidedrawer);
    }

    return (
        <Fragment>
            <Toolbar 
                isAuth={props.isAuthenticated}
                toggle={sidedrawerToggleHandler}/>
            <Sidedrawer 
                isAuth={props.isAuthenticated}
                show={showSidedrawer} 
                closed={sidedrawerToggleHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null
})

export default connect(mapStateToProps)(Layout);