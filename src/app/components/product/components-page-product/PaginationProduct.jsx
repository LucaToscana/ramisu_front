import React, { useState, useEffect } from 'react';
import { getTotalProducts } from '../../../api/backend/product';
import { URL_CART } from '../../../shared/constants/urls/urlConstants';
import { useHistory } from 'react-router-dom';
import { selectPage, selectTotal, selectTotalPages, setCurrentPageFilter } from '../../../shared/redux-store/filterProductSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const PaginationProduct = ({ currentPage, setCurrentPage }) => {
    const dispatch = useDispatch()
    const page = useSelector(selectPage)
    const total = useSelector(selectTotal)
   // const totalPages = useSelector(selectTotalPages)

    const history = useHistory();

    const itemPerPage = 10;
    const pageNumberLimit = 12;
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(12);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    const pages = [];

    const pagesList = () => {
        var p = []

        for (let i = 0; i <= Math.ceil(total / itemPerPage) - 1; i++) {
            p.push(i);

        }
        return p
    }

    useEffect(() => {
        dispatch(setCurrentPageFilter(0))


    }, []);

    const handleClick = (number) => {
        setCurrentPage(parseInt(number));
        dispatch(setCurrentPageFilter(parseInt(number)))
    };

    /*   for (let i = 0; i <= Math.ceil(total / itemPerPage) - 1; i++) {
           pages.push(i);
       }
   */
    const renderPageNumber = () => pagesList().map((number) => {
        if (number<=maxPageNumberLimit) {
            return (
                <li key={number}
                    id={number}
                    onClick={() => handleClick(number)}
                    className={`w-12 h-10 p-2 inline-block rounded-full bg-gray-500 hover:bg-blue-500 ${currentPage === number ? "active " : "bg-color-red"}`}
                >
                    {number + 1}
                </li>
            );
        } else {
            return null;
        }
    });

    const nextPage = () => {

        dispatch(setCurrentPageFilter(+page + 1))
        setCurrentPage(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        };
    };

    const prevPage = () => {
        dispatch(setCurrentPageFilter(+page - 1))

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
        <div className=''>

            <ul className=" flex justify-center m-5 text-black text-center ">
                <li className="rounded-full w-24 h-10 bg-gray-500 hover:bg-blue-500">
                    <button
                        onClick={prevPage}
                        //   disabled={currentPage === pages[0] ? true : false}
                        className="w-24 h-10 "
                    >
                        Précédent
                    </button>
                </li>
                {pageDecrementBtn}
                <div > {renderPageNumber()}</div>
                {pageIncrementBtn}

                <li className="inline-block rounded-full w-24 h-10 bg-gray-500 hover:bg-blue-500">
                    <button
                        onClick={nextPage}
                        //    disabled={currentPage === pages[pages.length - 1] ? true : false}
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