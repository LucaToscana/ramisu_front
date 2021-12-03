import React, { useEffect, useState } from 'react'
import { getProducts } from '../../../api/backend/product';
import PaginationProduct from './PaginationProduct';
import { Product, ProductList } from './Product';




const ListProducts = ({ show }) => {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        getProducts(currentPage).then(response => {
            setProducts(response.data);
        });
    }, [currentPage]);

    return (
        <div>
            {show ? <div className="md:grid md:grid-cols-2 lg:grid-cols-3  sm:w-100">
                {products.map(product => {
                    return (
                        <Product
                            key={product.id}
                            label={product.label}
                            price={product.price}
                            id={product.id}
                            stock={product.stock}
                        />
                    );
                })}
            </div> : <div className="md:grid md:grid-cols-2 lg:grid-cols-3  sm:w-100">
                {products.map(product => {
                    return (
                        <ProductList
                            key={product.id}
                            label={product.label}
                            price={product.price}
                            id={product.id}
                            stock={product.stock}
                        />
                    );
                })}
            </div>}
            <PaginationProduct
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>
    )
}

export default ListProducts;
