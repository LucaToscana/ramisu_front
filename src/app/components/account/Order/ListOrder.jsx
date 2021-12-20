import React, { useState, useEffect } from 'react';
import { getOrders } from '../../../api/backend/order';
import Orders from './Orders';
import OrderDetail from './OrderDetail';


function ListOrder() {

    const [orders, setOrders] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [orderId, setOrderId] = useState();

    useEffect(() => {
        getOrders().then(response => {
            setOrders(response.data);
            setIsLoad(true);
        });
    }, []);

    const showModal = (id) => {
        setOrderId(id);
        setModalIsOpen(true);
    }


    return (
        <>
            <div className='text-center bodyTable m-8'>
                <div className='md:grid md:grid-cols-5 headerTable p-8'>
                    <div>Numéro de commande</div>
                    <div>Date</div>
                    <div>Status</div>
                    <div>Prix</div>
                    <div>Détails</div>
                </div>
                {isLoad ?
                    <>
                        {orders.map((order) => {
                            return (
                                <Orders
                                    key={order.id}
                                    order={order}
                                    showModal={showModal}
                                />
                            )
                        })}
                    </> : <><h1>Loading...</h1></>}
            </div>
            <OrderDetail
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                orderId={orderId}
            />
        </>
    )

}

export default ListOrder;


{/* <div className='text-center bodyTable m-8'>
<div className='grid grid-cols-5 headerTable p-8'>
    <div>Numéro de commande</div>
    <div>Date</div>
    <div>Status</div>
    <div>Prix</div>
    <div>Détails</div>
</div>
{ordersList}
</div> */}