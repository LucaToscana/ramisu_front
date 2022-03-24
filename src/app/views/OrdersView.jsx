import React from 'react';
import ListOrder from './../components/account/Order/ListOrder';
import Modal from 'react-modal';

function OrdersView() {

    Modal.setAppElement('#root');


    return (
        <div style={{ minHeight: 500 }}>
            <ListOrder />
        </div>
    )
}

export default OrdersView
