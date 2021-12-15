import React from 'react';


function Orders({ id, orderDate, status, total }) {


    return (
        <div>
            <div>Numéro de commande</div>
            <div>Prix</div>
            <div>Date</div>
            <div>Status</div>
            <div>
                <div>{id}</div>
                <div>{orderDate}</div>
                <div>{status}</div>
                <div>{total}</div>
            </div>
        </div>
    )
}

export default Orders;
