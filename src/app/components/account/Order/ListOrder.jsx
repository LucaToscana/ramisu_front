import React, { useState } from 'react';
import { useEffect } from 'react';
import { getOrders } from '../../../api/backend/order';
import Orders from './Orders';

function ListOrder() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders().then(response => {
            setOrders(response.data);
        });
    }, []);

    console.log(orders);

    const ordersList = orders.map(order => {
        return (
            <Orders
                key={order.id}
                id={order.id}
                orderDate={order.order_date}
                status={order.status.label}
                total={order.total}
            />
        )
    })

    return (
        <div>
            {ordersList}
        </div>
    )
}

export default ListOrder
