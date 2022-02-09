import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { getOrderDetailsWithListProduct } from '../api/backend/order';
import OrderDetails from '../components/order/OrderDetails';



const ProductDetailView = () => {
    const [order, setOrder] = useState()
    const [total, setTotal] = useState()
    const [status, setStatus] = useState()
    const [date, setDate] = useState()
    const [address, setAddress] = useState()



    const [productsOrder, setProductsOrder] = useState()

    const id = useParams().id


    useEffect(() => {



        getOrderDetailsWithListProduct(id).then(result => {
            setTotal(result.data.content.total)
            setOrder(result.data.content)
            setProductsOrder(result.data.productOrderWrappers)

            setStatus(result.data.content.status.label)
            setDate(result.data.content.date)

        })
    }, [JSON.stringify(productsOrder)])




    return (
        <div className="flex items-center justify-center md:m-10">

            <OrderDetails id={id}
                order={order}
                productsOrder={productsOrder}
                total={total}
                status={status}
                date={date}

            />
        </div>
    );
};

export default ProductDetailView;