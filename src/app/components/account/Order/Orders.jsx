import { SearchCircleIcon } from '@heroicons/react/solid';
import React from 'react';
import { useHistory } from 'react-router-dom';


function Orders({ order, showModal }) {
    const history = useHistory();

    return (
        <div className='md:grid md:grid-cols-5 p-6 border-b-2'>
            <div className='p-2'>{order.id}</div>
            <div className='p-2'>{order.date}</div>
            <div className='p-2'>{order.status.label}</div>
            <div className='p-2'>{order.total} € TTC</div>
            <div className='grid grid-cols-2'><button><SearchCircleIcon className=' ml-16 h-8 w-8 '
             onClick={() => showModal(order.id)}></SearchCircleIcon>  </button> 
          <div className='detailOrder ' onClick={() => {
                    history.push(`/order/detail/${order.id}`)
                }} > Détails</div>
            </div>
        </div>
    )
}

export default Orders;
