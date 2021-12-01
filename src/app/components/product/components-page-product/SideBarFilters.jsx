import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { getAllCategories, getAllUniverses, getAllTags } from '../../../api/backend/filter';
import SelectFilter from '../../../shared/components/buttons/SelectFilter';


const SideBarFilters = ({ filters, handleFilters }) => {

    const [categories, setCategories] = useState([]);
    const [universes, setUniverses] = useState([]);
    const [tags, setTags] = useState([]);

    // Allows to recover data in back
    useEffect(() => {
        axios.all([getAllCategories(), getAllUniverses(), getAllTags()]).then(responses => {
            setCategories(responses[0].data);
            setUniverses(responses[1].data);
            setTags(responses[2].data);
        })
    }, []);

    const listCategories = categories.map(category => {
        return (
            <CheckFilter
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
            <SelectFilter title="Catégories">
                {listCategories}
            </SelectFilter>
            <SelectFilter title="Tags">
                {listTags}
            </SelectFilter>
        </div>
    )
}

export default SideBarFilters;


const CheckFilter = ({ label, handleFilters, checked }) => {
    // const [checked, setChecked] = useState(false);

    const handleChecked = (e) => {
        handleFilters(label);
    }



    return (
        <div className="ml-8 flex items-center p-2">
            <input type="checkbox" name={label} id={label} checked={checked} onChange={handleChecked} />
            <label htmlFor={label} className="ml-4 mb-0">{label}</label>
        </div>
    )
}
