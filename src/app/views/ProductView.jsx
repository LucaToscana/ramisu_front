import React, { useEffect, useState } from 'react';
import ProductsList from '../components/product/components-page-product/ProductsList';
import { AdjustmentsIcon } from '@heroicons/react/solid';
import SideBarFilters from '../components/product/components-page-product/SideBarFilters';
import ShowFilters from '../components/product/components-page-product/ShowFilters';
import { useDispatch } from 'react-redux';
import { initFilter, labelFilter, selectProductFilter } from '../shared/redux-store/filterProductSlice';
import { useSelector } from 'react-redux';
import LayoutSwitcher from '../components/product/components-page-product/LayoutSwitcher';



const ProductView = () => {
    const dispatch = useDispatch()

 
    useEffect(() => {

        dispatch(labelFilter(""));
        document.getElementById("searchNavBar").value = ""

        }, []);
     
    const filterStore = useSelector(selectProductFilter);
    const getFilter = () => {

        let array = []

            if (filterStore.category !== null)   array.push(filterStore.slice());
            
            if (filterStore.universe !== null)   array.push(filterStore.universe.slice());
            
            if (filterStore.tag !== null)        array.push(filterStore.tag.slice());
            
        return array;

    }

    // Creation of a state for products
    const [openModal, setOpenModal] = useState(false);
    const [filters, setFilters] = useState(getFilter());
    const [displayGrid, setLayout] = useState(true);


    const handleFilters = (label) => {
        if (filters.includes(label)) {
            setFilters(filter => [...filter].filter((filter) => filter !== label))
        } else {
            setFilters(filter => [...filter, label]);
        }
    }



    return (
        <div>
            <ShowFilters    filters={filters}   handleFilters={handleFilters}/>
                <div className="flex justify-between lg:justify-end m-4">
                    
                    <div className="pl-2 pr-2 filterButton w-2/5 flex justify-between items-center lg:hidden" onClick={() => setOpenModal(!openModal)}>
                        <button className="font-bold">Filtre</button>
                        <AdjustmentsIcon    className="transform rotate-90" width={32} height={32}  />
                    </div>
                
                {
                    openModal &&
                        <div    className="fixed z-10 left-0 top-auto bg-gray-300 w-screen h-screen object-contain lg:hidden" aria-modal="true" 
                                aria-labelledby="modal-title" role="dialog">
                            <SideBarFilters toggleModal={openModal} setToggleModal={setOpenModal}   
                                            filters={filters}   handleFilters={handleFilters}   />
                            <div className="lg:hidden flex justify-center ">
                                <button className="filterButton p-2 mt-10" 
                                        onClick={() => setOpenModal(!openModal)} >
                                    Fermer
                                </button>
                            </div>
                        </div>
                }
                
                <div className="flex justify-center self-center m-2 ">
                    <p>{"total products:  " + JSON.parse(localStorage.getItem("filters")).total}</p>
                </div>

                    <LayoutSwitcher callback={setLayout} />

            </div>

            <div className="lg:flex">
                <div className="hidden lg:grid w-52 filter lg:m-5 p-1">
                    <SideBarFilters handleFilters={handleFilters} filters={filters} />
                </div>
                <div className='w-full'>
                    <ProductsList   displayGrid={displayGrid} /></div>
            </div>

        </div>
    );
};

export default ProductView;

