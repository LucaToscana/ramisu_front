import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { URL_PRODUCT, URL_PRODUCT_FIGURINES, URL_PRODUCT_LIBRAIRIE, URL_PRODUCT_PEINTURES } from '../../../shared/constants/urls/urlConstants'
import { removeFilter, setPriceRange } from '../../../shared/redux-store/filterProductSlice'

function FilterTags({ getFilters, handleFilters }) {
    
    const dispatch = useDispatch()
    const location = useLocation();
   
    const getFilterPrice = () => {
        return {
            min: JSON.parse(localStorage.getItem('filters')).minPrice,
            max: JSON.parse(localStorage.getItem('filters')).maxPrice
        }
    }
    

    const removeFilterX = (label) => {
        handleFilters(label)
        dispatch(removeFilter(label))
    }

    const removeFilterPrice = () => {
        dispatch(setPriceRange({ min: 0, max: 10000 }))
        handleFilters("priceRange")
    }

    const isRemovable =(label)=>
    {
        return      (location.pathname === URL_PRODUCT )||
                    (location.pathname === URL_PRODUCT_PEINTURES) && label !== "Peinture" ||
                    (location.pathname === URL_PRODUCT_FIGURINES) && label !== "Figurine" ||
                    (location.pathname === URL_PRODUCT_LIBRAIRIE) && label !== "Livre";
    }

    return (
        <div className="hidden lg:flex lg:flex-wrap lg:showFilters lg:m-4">
            {
                getFilterPrice().max !== 10000 || getFilterPrice().min !== 0 &&
                    <div key={"priceRange"} className="flex  showFilter shadow-inner mb-4 mr-8">
                        <p className="font-bold p-2" >Prix range: min {getFilterPrice().min}€- max{getFilterPrice().max}€ </p>
                        <p className="font-bold p-2 deleteFilter" onClick={() => removeFilterPrice()}>X</p>
                    </div>
            }

            {
                getFilters().map((filtersArray,i) =>{

                    return filtersArray.map((label, j)=>{
                        return (<div key={i+j} className="flex  showFilter shadow-inner mb-4 mr-8">
                                    <span  className="font-bold p-2">{label}</span>
                                    { isRemovable(label) &&(<span className="font-bold p-2 deleteFilter hover:cursor-pointer " onClick={() => removeFilterX(label)} >X</span>)}
                                </div>)
                    });
                    
                })
            }
        </div>
    )
}

export default FilterTags
