import React, {useEffect, useState} from 'react'
import figurine from '../assets/images/figurine.jpg'
import {productDetail} from "../api/backend/product";
import ProductDetails from "../components/product/ProductDetails"

/**
 * recovers the product in databas with the id
 * @author Brahim TALLA
 */

const ProductDetailView = () => {
    const [product, setProduct] = useState([])

    useEffect(()=>{
        productDetail(product.id).then(res=>{
            setProduct(res.data)
        })
    },[])
    return (
        <div className="flex flex-col md:flex-row flex items-center">
                <img
                    className="w-36 md:w-auto mb-4"
                    src={figurine}
                    alt=""
                />
                <ProductDetails label={product.label}
                                price={product.price}
                                description={product.description}/>
        </div>
    );
};

export default ProductDetailView;