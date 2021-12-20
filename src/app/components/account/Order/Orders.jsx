import React from 'react';


function Orders({ order, showModal }) {

    return (
        <div className='md:grid md:grid-cols-5 p-6 border-b-2'>
            <div className='p-2'>{order.id}</div>
            <div className='p-2'>{order.date}</div>
            <div className='p-2'>{order.status.label}</div>
            <div className='p-2'>{order.total} € TTC</div>
            <div className='detailOrder p-2' onClick={() => showModal(order.id)}>Détails</div>
        </div>
    )
}

export default Orders;
