import React, { useState, useEffect } from 'react';
import { Product, ProductList } from '../components/product/Product';
import { getProducts } from './../api/backend/product';
/**
 * Creation of productView for the listing of products
 * 
 * @author Jeremy Dejonghe
 */
const ProductView = () => {

    // Creation of a state for products
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(true);

    // Allows to recover data in back
    useEffect(() => {
        getProducts().then(response => {
            setProducts(response.data);
        });
    }, []);

    // Browse the table of retrieved data to display them
    const listProductsColumn = products.map(product => {
        return (
            <Product
                key={product.id}
                label={product.label}
                description={product.description}
                price={product.price}
            />
        );
    });

    const listListingProducts = products.map(product => {
        return (
            <ProductList
                key={product.id}
                label={product.label}
                description={product.description}
                price={product.price}
            />
        );
    });

    return (
        <div>
            <div className="flex justify-end mr-4 mt-4">
                <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
                    <button onClick={() => setShow(true)} className={show ? "inline-flex items-center transition-colors duration-300 ease-in focus:outline-none  focus:text-blue-400 rounded-l-full px-4 py-2 active" : "inline-flex items-center transition-colors duration-300 ease-in focus:outline-none  focus:text-blue-400 rounded-l-full px-4 py-2"} id="grid">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-current w-4 h-4 mr-2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                    </button>
                    <button onClick={() => setShow(false)} className={show ? "inline-flex items-center transition-colors duration-300 ease-in focus:outline-none  focus:text-blue-400 rounded-l-full px-4 py-2" : "inline-flex items-center transition-colors duration-300 ease-in focus:outline-none  focus:text-blue-400 rounded-l-full px-4 py-2 active"} id="list">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-current w-4 h-4 mr-2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                    </button>
                </div>
            </div>
            {show ? <div className="grid grid-cols-2 w-screen">
                {listProductsColumn}
            </div> : <div className="w-screen">
                {listListingProducts}
            </div>}
        </div>
    );
};

export default ProductView;