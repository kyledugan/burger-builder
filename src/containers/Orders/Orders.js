import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/orders/ordersActions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import moment from 'moment';

const Orders = props => {
    const { onGetOrders, token, userId } = props;
    
    useEffect(() => {
        onGetOrders(token, userId);
    }, [onGetOrders, token, userId]) 

    const sortOrders = (a,b) => {
        return Date.parse(b.time) - Date.parse(a.time)
    }

    let sortedOrders = [];
    if (props.orders.length) {
        sortedOrders = props.orders.sort(sortOrders)
    }

    let orders = <Spinner />;
    if (!props.loading) {
        orders = (
            <div>
                {sortedOrders.map(order => {
                    return (
                        <Order 
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                            time={moment(order.time).format('MMMM Do YYYY, h:mm a')} />
                    );
                })}
            </div>
        );
    }
    return orders;
}

const mapStateToProps = state => ({
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
})

const mapDispatchToProps = dispatch => ({
    onGetOrders: (token, userId) => dispatch(actions.getOrders(token, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));