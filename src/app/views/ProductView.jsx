import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Product } from '../components/product/Product';
import { getProducts } from './../api/backend/product';
/**
 * Creation of productView for the listing of products
 * 
 * @author Jeremy Dejonghe
 */
const ProductView = () => {
    
    // Creation of a state for products
    const [products, setProducts] = useState([]);

    // Allows to recover data in back
    useEffect(() => {
        getProducts().then(response => {
            setProducts(response.data);
        });
    }, []);

    // Browse the table of retrieved data to display them
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
            <div className="grid grid-cols-2 w-screen">
                {listProducts}
            </div>
        </div>
    );
};

export default ProductView;