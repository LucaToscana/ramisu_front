import React, {useEffect, useState} from 'react'
import figurine from '../assets/images/figurine.jpg'
import {productDetail} from "../api/backend/product";
import ProductDetails from "../components/product/ProductDetails"

const ProductDetailView = () => {
    const [product, setProduct] = useState([])

    useEffect(()=>{
        productDetail().then(res=>{
            setProduct(res.data)
        })
    },[])
    return (
        <>
                <img
                    width={200}
                    src={figurine}
                    alt=""
                />
                <ProductDetails label={product.label}
                                price={product.price}
                                description={product.description}/>
        </>
    );
};

export default ProductDetailView;