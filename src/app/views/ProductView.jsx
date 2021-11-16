import React, { useState, useEffect } from 'react';
import { Product, ProductList } from '../components/product/Product';
import { getProducts, getTotalProducts } from './../api/backend/product';
import Filter from '../components/layouts/Filter';
/**
 * Creation of productView for the listing of products
 * 
 * @author Jeremy Dejonghe
 */
const ProductView = () => {

    // Creation of a state for products
    const [products, setProducts] = useState([]);
    const [TotalProducts, setTotalProducts] = useState(0);
    const [show, setShow] = useState(true);

    const [page, setPage] = useState(0);
    const [itemPerPage] = useState(10);
    const [pageNumberLimit] = useState(12);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(12);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const handleClick = (number) => {
        setPage(number);
    };

    const pages = [];

    for (let i = 0; i <= Math.ceil(TotalProducts / itemPerPage) - 1; i++) {
        pages.push(i);
    }

    

    // Allows to recover data in back
    useEffect(() => {
        getTotalProducts().then(response => {
            setTotalProducts(response.data);
        });
        getProducts(page).then(response => {
            setProducts(response.data);
        });
    }, [page]);

    const renderPageNumber = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li key={number}
                    onClick={() => handleClick(number)}
                    className={`w-12 h-10 p-2 inline-block rounded-full bg-gray-500 hover:bg-blue-500 ${page === number ? "active " : "hidden"}`}
                >
                    {number + 1}
                </li>
            );
        } else {
            return null;
        }
    });

    const nextPage = () => {
        setPage(page + 1);

        if (page + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        };
    };

    const prevPage = () => {
        setPage(page - 1);

        if ((page - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        };
    };

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li className="inline-block rounded-full w-12 h-10 p-1 border-2 border-white  hover:bg-blue-500" onClick={nextPage}>&hellip;</li>
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li className="inline-block rounded-full w-12 h-10 p-1 border-2 border-white hover:bg-blue-500" onClick={prevPage}>&hellip;</li>
    }

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
                    <button onClick={() => setShow(true)} className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none  focus:text-blue-400 rounded-l-full px-4 py-2 ${show ? "active" : ""}`} id="grid">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-current w-4 h-4 mr-2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                    </button>
                    <button onClick={() => setShow(false)} className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none  focus:text-blue-400 rounded-l-full px-4 py-2 ${show ? "" : "active"}`} id="list">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-current w-4 h-4 mr-2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                    </button>
                </div>
            </div>
            <div className="lg:flex">
                <Filter />
            {show ? <div className="md:grid md:grid-cols-2 lg:grid-cols-3  sm:w-100">
                {listProductsColumn}
            </div> : <div className="md:grid md:grid-cols-2 lg:grid-cols-3  sm:w-100">
                {listListingProducts}
            </div>}
            </div>
            <ul className=" flex justify-center m-5 text-white text-center">
                <li className="inline-block rounded-full w-24 h-10 bg-gray-500 hover:bg-blue-500">
                    <button
                        onClick={prevPage}
                        disabled={page === pages[0] ? true : false}
                        className="w-24 h-10 "
                    >
                        Précédent
                    </button>
                </li>
                {pageDecrementBtn}
                {renderPageNumber}
                {pageIncrementBtn}

                <li className="inline-block rounded-full w-24 h-10 bg-gray-500 hover:bg-blue-500">
                    <button
                        onClick={nextPage}
                        disabled={page === pages[pages.length - 1] ? true : false}
                        className="w-24 h-10 "
                    >
                        Suivant
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default ProductView;