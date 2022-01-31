import React, { useEffect, useState } from 'react'
import { productDetail } from "../api/backend/product";
import ProductDetails from "../components/product/ProductDetails"
import { useParams } from "react-router-dom";
import { selectCart } from '../shared/redux-store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { initFilter } from '../shared/redux-store/filterProductSlice';

/**
 * recovers the product in databas with the id
 * @author Brahim TALLA
 */

const ProductDetailView = () => {
    const [product, setProduct] = useState([])
    const id = useParams().id
    const [cart, setCart] = useState({})
    const carts = useSelector(selectCart)
    const [cartQuantity, setCartQuantity] = useState()
    useEffect(() => {


        
        productDetail(id).then(res => {
            setProduct(res.data)


            var cartFind = carts.find(x => x.id === res.data.id)
            if (cartFind !== undefined) {
                setCart(cartFind)
                setCartQuantity(cartFind.quantite)

            }
            else { setCart(null) }
        }

        )



    }, [id, cartQuantity, cart])
    return (
        <div className="flex items-center justify-center md:m-10">
            <ProductDetails
                picture={product.picture}
                label={product.label}
                price={product.price}
                description={product.description}
                stock={product.stock}
                id={product.id}
                cart={cart}
                cartQuantity={cartQuantity}
            />
        </div>
    );
};

export default ProductDetailView;