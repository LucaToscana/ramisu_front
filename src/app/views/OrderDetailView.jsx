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
    const [profile, setProfile] = useState()
    const [subTotal, setSubTotal] = useState()



    const [productsOrder, setProductsOrder] = useState()

    const id = useParams().id


    useEffect(async() => {



      await  getOrderDetailsWithListProduct(id).then(result => {
            setTotal(result.data.content.total)
            setOrder(result.data.content)
            setProductsOrder(result.data.productOrderWrappers)
            if( result.data.content.livraisonAddress!==null){
            setAddress(
            result.data.content.livraisonAddress.number+" "+
            result.data.content.livraisonAddress.street+", "+
            result.data.content.livraisonAddress.additionalAddress+" "+
            result.data.content.livraisonAddress.postalCode+", "+
            result.data.content.livraisonAddress.city+", "+
            result.data.content.livraisonAddress.country+" "
            )}
            setStatus(result.data.content.status.label)
            setDate(result.data.content.date)
            setProfile(
                result.data.content.usersInformation.lastName+" "+
                result.data.content.usersInformation.firstName+" , email: "+
                result.data.content.usersInformation.user.mail+" , telephone:  "+
                result.data.content.usersInformation.phone

            )

            let products = result.data.productOrderWrappers
            let subTotalP = 0;
            for (let i = 0; i < products.length; i++) {
                subTotalP += products[i].quantite * products[i].price
            }
        
            setSubTotal(subTotalP)

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
                address={address}
                profile={profile}
                subTotal={subTotal}
            />
        </div>
    );
};

export default ProductDetailView;