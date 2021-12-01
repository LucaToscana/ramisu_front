import React, { useState } from 'react';
import ListProducts from './../components/product/components-page-product/ListProducts';
import { AdjustmentsIcon, ViewGridIcon, ViewListIcon } from '@heroicons/react/solid';
import SideBarFilters from '../components/product/components-page-product/SideBarFilters';
import ShowFilters from '../components/product/components-page-product/ShowFilters';
/**
 * Creation of productView for the listing of products + pagination + filter
 * 
 * @author Jeremy Dejonghe
 */
const ProductView = () => {

    // Creation of a state for products
    const [openModal, setOpenModal] = useState(false);
    const [filters, setFilters] = useState([]);
    const [show, setShow] = useState(true);

    const handleFilters = (label) => {
        if (filters.includes(label)) {
            setFilters(filter => [...filter].filter((filter) => filter !== label))
        } else {
            setFilters(filter => [...filter, label]);
        }
    }

    return (
        <div>
            <ShowFilters
                filters={filters}
                handleFilters={handleFilters}
            />
            <div className="flex justify-between lg:justify-end m-4">
                <div className="pl-2 pr-2 filterButton w-2/5 flex justify-between items-center lg:hidden" onClick={() => setOpenModal(!openModal)}>
                    <button className="font-bold">
                        Filtre
                    </button>
                    <AdjustmentsIcon
                        className="transform rotate-90"
                        width={32}
                        height={32}
                    />
                </div>
                {openModal &&
                    <div className="fixed z-10 left-0 top-auto bg-gray-300 w-screen h-screen object-contain lg:hidden" aria-modal="true" aria-labelledby="modal-title" role="dialog">
                        <SideBarFilters
                            toggleModal={openModal}
                            setToggleModal={setOpenModal}
                            filters={filters}
                            handleFilters={handleFilters}
                        />
                        <div className="lg:hidden flex justify-center ">
                            <button className="filterButton p-2 mt-10" onClick={() => setOpenModal(!openModal)} >
                                Fermer
                            </button>
                        </div>
                    </div>
                }
                <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
                    <button onClick={() => setShow(true)} className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none  focus:text-blue-400 rounded-l-full px-4 py-2 ${show ? "active" : ""}`} id="grid">
                        <ViewGridIcon
                            width={32}
                            height={32}
                        />
                    </button>
                    <button onClick={() => setShow(false)} className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none  focus:text-blue-400 rounded-l-full px-4 py-2 ${show ? "" : "active"}`} id="list">
                        <ViewListIcon
                            width={32}
                            height={32}
                        />
                    </button>
                </div>
            </div>

            <div className="lg:flex">
                <div className="hidden lg:flex lg:flex-col w-1/2 filter lg:m-5">
                    <SideBarFilters
                        handleFilters={handleFilters}
                        filters={filters}
                    />
                </div>
                <ListProducts
                    show={show}
                />
            </div>

        </div>
    );
};

export default ProductView;