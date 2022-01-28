import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  productSearchCriteria } from '../../../api/backend/product';
import { selectPage, selectProductFilter,  setCurrentPageFilter, setTotal } from '../../../shared/redux-store/filterProductSlice';
import PaginationProduct from './PaginationProduct';
import { Product, ProductList } from './Product';




const ListProducts = ({ show }) => {
    const filter = useSelector(selectProductFilter)
    const dispatch = useDispatch()
    const pageRedux = useSelector(selectPage)
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const page = useSelector(selectPage)




    useEffect(() => {


        productSearchCriteria(filter).
            then(response => {
                if (response.data.content !== null) {
                    if (response.data.content.length === 0) {
                        dispatch(setCurrentPageFilter(page - 1))

                    }
                    setProducts(response.data.content);
                    dispatch(setTotal(response.data.totalElements))
                    setCurrentPage(filter.page)

                }
            })
    }, [JSON.stringify(filter)]);

    return (
        <div>
            {products.length===0?"aucun produit trouvé":null}
            {show ? <div className="md:grid md:grid-cols-2 lg:grid-cols-3  sm:w-100">
                {products.map(product => {
                    return (
                        <Product
                            key={product.id}
                            label={product.label}
                            price={product.price}
                            id={product.id}
                            stock={product.stock}
                            picture={product.picture}
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
                            picture={product.picture}
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
