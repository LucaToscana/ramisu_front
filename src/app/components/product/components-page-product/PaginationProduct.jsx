import React, { useState, useEffect } from 'react';
import { getTotalProducts } from '../../../api/backend/product';
import { URL_CART } from '../../../shared/constants/urls/urlConstants';
import { useHistory } from 'react-router-dom';


const PaginationProduct = ({ currentPage, setCurrentPage }) => {

    const history = useHistory();

    const [TotalProducts, setTotalProducts] = useState(0);

    const itemPerPage = 10;
    const pageNumberLimit = 12;
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(12);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    const pages = [];

    useEffect(() => {
        getTotalProducts().then(response => {
            setTotalProducts(response.data);
        });
    }, []);

    const handleClick = (number) => {
        setCurrentPage(parseInt(number));
    };

    for (let i = 0; i <= Math.ceil(TotalProducts / itemPerPage) - 1; i++) {
        pages.push(i);
    }

    const renderPageNumber = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li key={number}
                    onClick={() => handleClick(number)}
                    className={`w-12 h-10 p-2 inline-block rounded-full bg-gray-500 hover:bg-blue-500 ${currentPage === number ? "active " : "hidden"}`}
                >
                    {number + 1}
                </li>
            );
        } else {
            return null;
        }
    });

    const nextPage = () => {
        setCurrentPage(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        };
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit === 0) {
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



    return (
        <div>
            <ul className=" flex justify-center m-5 text-white text-center">
                <li className="inline-block rounded-full w-24 h-10 bg-gray-500 hover:bg-blue-500">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === pages[0] ? true : false}
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
                        disabled={currentPage === pages[pages.length - 1] ? true : false}
                        className="w-24 h-10 "
                    >
                        Suivant
                    </button>
                </li>
            </ul>
            <button className="btn btn-primary" onClick={() => history.push(URL_CART)}>Panier</button>
        </div>
    )
}

export default PaginationProduct;