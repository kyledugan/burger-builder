import React, { useEffect, Suspense } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Register from './containers/Register/Register';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/auth/authActions';
// import Checkout from './containers/Checkout/Checkout'

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const App = props => {
  const { onTryAutoLogin } = props;

  useEffect(() => {
    onTryAutoLogin();
  }, [onTryAutoLogin]); 

  let routes = (
    <Switch>
      <Route path='/' exact component={BurgerBuilder} />
      <Route path='/auth' render={props => <Auth {...props} />} />
      <Route path='/register' component={Register} />
      <Route path='/checkout' render={props => <Checkout {...props} />} />
      <Redirect to='/' />
    </Switch>
  );
  if (props.authenticated) {
    routes = (
      <Switch>
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/checkout' render={props => <Checkout {...props} />} />
        <Route path='/orders' render={props => <Orders {...props} />} />
        <Route path='/auth' render={props => <Auth {...props} />} />
        <Route path='/register' component={Register} />
        <Route path='/logout' component={Logout} />
      </Switch>
    );
  }
  return (
    <div className="App">
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => ({
  authenticated: state.auth.token !== null
})

const mapDispatchToProps = dispatch => ({
  onTryAutoLogin: () => dispatch(actions.authCheckState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));