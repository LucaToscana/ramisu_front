import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFilter, selectProductFilter, setPriceRange } from '../../../shared/redux-store/filterProductSlice'

function ShowFilters({ filters, handleFilters }) {
    const dispatch = useDispatch()

    const getFIlterPrice = () => {

        return {
            min: JSON.parse(localStorage.getItem('filters')).minPrice,
            max: JSON.parse(localStorage.getItem('filters')).maxPrice
        }
    }
    const filterStore = useSelector(selectProductFilter);
    const getFIlter = () => {

        let f = []

        if (filterStore.tag !== null) {

            for (let i = 0; i <= filterStore.tag.length - 1; i++) {
                f.push(filterStore.tag[i]);
            }
        }
        if (filterStore.universe !== null) {

            for (let i = 0; i <= filterStore.universe.length - 1; i++) {
                f.push(filterStore.universe[i]);
            }
        }

        if (filterStore.category !== null) {

            for (let i = 0; i <= filterStore.category.length - 1; i++) {
                f.push(filterStore.category[i]);
            }
        }

        
        return f

    }
    const removeFilterX = (f) => {

        handleFilters(f)
        dispatch(removeFilter(f))
    }
    const removeFilterPrice = () => {
        dispatch(setPriceRange({min :0,max:10000}))
        handleFilters("priceRange")

    }




    return (
        <div className="hidden lg:flex lg:flex-wrap lg:showFilters lg:m-4">

            {getFIlterPrice().max !== 10000 || getFIlterPrice().min !== 0 ?
                <div key={"priceRange"} className="flex  showFilter shadow-inner mb-4 mr-8">
                    <p className="font-bold p-2" >Prix range: min {getFIlterPrice().min}€- max{getFIlterPrice().max}€ </p>
                    <p className="font-bold p-2 deleteFilter" onClick={() => removeFilterPrice()}>X</p>
                </div> : null
            }

            {getFIlter().map(f =>
                <div key={f} className="flex  showFilter shadow-inner mb-4 mr-8">
                    <p className="font-bold p-2" >{f}</p>
                    <p className="font-bold p-2 deleteFilter hover:cursor-pointer " onClick={() => removeFilterX(f)}>X</p>
                </div>
            )}
        </div>
    )
}

export default ShowFilters
