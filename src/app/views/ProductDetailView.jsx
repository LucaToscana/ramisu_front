import React, { useEffect, useState } from 'react'
import { productDetail } from "../api/backend/product";
import ProductDetails from "../components/product/ProductDetails"
import { useParams } from "react-router-dom";

/**
 * recovers the product in databas with the id
 * @author Brahim TALLA
 */

const ProductDetailView = () => {
    const [product, setProduct] = useState([])
    const id = useParams().id
    useEffect(() => {
        productDetail(id).then(res => {
            setProduct(res.data)
        })
    }, [id])
    return (
        <div className="flex items-center justify-center md:m-10">
            <ProductDetails
                picture={product.picture}
                label={product.label}
                price={product.price}
                description={product.description}
                stock={product.stock}
                id={product.id}
            />
        </div>
    );
};

export default ProductDetailView;