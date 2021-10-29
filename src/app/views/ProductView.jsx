import React, { useState, useEffect } from 'react';
import { Product } from '../components/product/Product';
import { getProducts } from './../api/backend/product';

const ProductView = () => {
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
       getProducts.then(response => {
            setProducts(response.data);
        });
    }, []);

    const listProducts = products.map(product => {
        return (
            <Product 
                key={product.id}
                label={product.label}
                description={product.description}
                price={product.price}
            />
        );
    });


    return (
        <div>
            <h1>Hello</h1>
            <div>
                {listProducts}
            </div>
        </div>
    );
};

export default ProductView;