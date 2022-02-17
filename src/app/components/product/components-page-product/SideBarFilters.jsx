import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { getAllCategories, getAllUniverses, getAllTags } from '../../../api/backend/filter';
import SelectFilter from '../../../shared/components/buttons/SelectFilter';
import { categoryFilter, initFilter, setPriceRange, tagFilter, universeFilter } from '../../../shared/redux-store/filterProductSlice';
import { useDispatch } from 'react-redux';
import PriceInput from '../../../shared/components/form-and-error-components/PriceInput';
import { URL_PRODUCT_FIGURINES, URL_PRODUCT_LIBRAIRIE, URL_PRODUCT_PEINTURES } from '../../../shared/constants/urls/urlConstants';


const SideBarFilters = ({ filters, handleFilters }) => {
    const dispatch = useDispatch();

    const [categories, setCategories] = useState([]);
    const [universes, setUniverses] = useState([]);
    const [tags, setTags] = useState([]);

    const handelPriceRande = (values) => {
        
        if (+values.min <= +values.max) {

            dispatch(setPriceRange(values))

        }
    }

    // Allows to recover data in back
    useEffect(() => {
        //   dispatch( initFilter())
        axios.all([getAllCategories(), getAllUniverses(), getAllTags()]).then(responses => {
            setCategories(responses[0].data);
            setUniverses(responses[1].data);
            setTags(responses[2].data);
        })

    }, []);

    const listCategories = categories.map(category => {
        return (
            <CheckFilter
                typeFilter={"category"}

                key={category.id}
                label={category.label}
                handleFilters={handleFilters}
                checked={filters.includes(category.label)}
            />
        )
    });


    const listUniverses = universes.map(universe => {
        return (
            <CheckFilter
                typeFilter={"universe"}
                key={universe.id}
                label={universe.label}
                handleFilters={handleFilters}
                checked={filters.includes(universe.label)}
            />
        )
    });

    const listTags = tags.map(tag => {
        return (
            <CheckFilter
                typeFilter={"tag"}

                key={tag.id}
                label={tag.label}
                handleFilters={handleFilters}
                checked={filters.includes(tag.label)}
            />
        )
    });

    return (
        <div>
            <SelectFilter title="Univers">
                {listUniverses}
            </SelectFilter>
            {window.location.pathname !== URL_PRODUCT_PEINTURES &&
                window.location.pathname !== URL_PRODUCT_FIGURINES &&
                window.location.pathname !== URL_PRODUCT_LIBRAIRIE
                ? <SelectFilter title="Catégories">
                    {listCategories}
                </SelectFilter> : <div className='w-48'></div>}
            <SelectFilter title="Tags">
                {listTags}
            </SelectFilter>
            <SelectFilter title="Prix">
                <PriceInput submit={handelPriceRande} ></PriceInput>
            </SelectFilter>
        </div>
    )
}

export default SideBarFilters;


const CheckFilter = ({ label, handleFilters, checked, typeFilter }) => {
    // const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();

    const handleChecked = (e) => {
        if (typeFilter === "universe") {
            dispatch(universeFilter(label))
        }
        if (typeFilter === "category") {
            dispatch(categoryFilter(label))
        }
        if (typeFilter === "tag") {
            dispatch(tagFilter(label))
        }


        handleFilters(label);

    }



    return (
        <div className="ml-8 flex items-center p-2">
            <input type="checkbox" name={label} id={label} checked={checked} onChange={handleChecked} />
            <label htmlFor={label} className="ml-4 mb-0">{label}</label>
        </div>
    )
}
