import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  productSearchCriteria } from '../../../api/backend/product';
import { selectPage, selectProductFilter,  setCurrentPageFilter, setTotal } from '../../../shared/redux-store/filterProductSlice';
import PaginationProduct from './PaginationProduct';
import { Products } from './Products';


const ListProducts = ({ displayGrid }) => {

    const filter = useSelector(selectProductFilter)
    const dispatch = useDispatch()
    const pageRedux = useSelector(selectPage)
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(pageRedux);
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
    }, [JSON.stringify(filter),displayGrid]);

    return (
        <div>
            {products.length===0?"aucun produit trouvé":null}
            <div className={displayGrid ? 
                                "md:grid md:grid-cols-2 lg:grid-cols-3 sm:w-auto flex flex-col justify-center items-center"
                                :
                                "flex flex-col justify-center items-center"}>
                {products.map(product => {
                    return (
                        <Products
                            key={product.id}
                            label={product.label}
                            price={product.price}
                            id={product.id}
                            stock={product.stock}
                            picture={product.picture}
                            universe={product.universe}
                            displayGrid={displayGrid}
                        />
                    );
                })}
            
           </div>
            <PaginationProduct
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>
    )
}

export default ListProducts;
