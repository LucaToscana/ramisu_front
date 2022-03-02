import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCategories, getAllUniverses, getAllTags } from '../api/backend/filter';
import { selectProductFilter } from '../shared/redux-store/filterProductSlice';

/**
 * The Panel of Universes, Categories and ?? Tags ?? controle
 *
 * @returns the LabelPannelView page
 */

const LabelPannelView = () => {
  /* ************************* Importer depuis ProductView *********************************** */
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

  const [filters, setFilters] = useState(getFIlter());
        const handleFilters = (label) => {
        if (filters.includes(label)) {
            setFilters(filter => [...filter].filter((filter) => filter !== label))

        } else {
            setFilters(filter => [...filter, label]);


        }
    }
  
  /* ************************** Importer depuis SideBarFilters ********************************** */
  const [categories, setCategories] = useState([]);
  const [universes, setUniverses] = useState([]);
  const [tags, setTags] = useState([]);

  // Allows to recover data in back
  useEffect(() => {
    //   dispatch( initFilter())
    getAllCategories().then(responses => {
        setCategories(responses.data)})

    getAllUniverses().then(responses => {
        setUniverses(responses.data)})
        
    getAllTags().then(responses => {
        setTags(responses.data)})
    
  }, []);

  const listUniverses = universes.map(universe => {
    return (
      <button className="w-40 p-1 my-2 bg-custom-orange border-2 border-gray-300 focus:bg-yellow-400 rounded-xl whitespace-nowrap overflow-hidden overflow-ellipsis">
      <span> Label - 2 </span>
      </button>
    )
  }); // TODO faire afficher les noms des universes (prend en exemple dans SideBarFilters)

  return (
    // Position of the elements below
    <div  className="flex flex-col justify-center items-center mx-6 md:mx-20 xl:mx-40 text-white">
      {/* The box container characteristics */}
      <div className="box-border m-6 border-4 w-full min-h-[500px] bg-gray-700">
        <div className="text-center mt-5">
          <h2 className="underline font-bold">Pannel de gestion :</h2>
        </div>
        <div className="md:flex justify-center text-center md:space-x-5 xl:space-x-10 mt-5">
          <button className="w-40 p-5 mt-5 bg-custom-orange border-2 border-gray-300 focus:bg-yellow-400 rounded-xl">Catégories</button>
          <button className="w-40 p-5 mt-5 bg-custom-orange border-2 border-gray-300 focus:bg-yellow-400 rounded-xl">Univers</button>
          <button className="w-40 p-5 mt-5 bg-custom-orange border-2 border-gray-300 focus:bg-yellow-400 rounded-xl">Tags</button>
        </div>
        <div className="text-center mt-10">
          <div className="border-2 border-gray-300 rounded-xl w-min sm:w-96 p-3 mx-auto">
            <label htmlFor="inputPannel">Label : </label>
            <input type="text" aria-label="inputPannel" className="rounded-md border-gray-300 bg-gray-500 placeholder-gray-400" placeholder="Label name" />
          </div>
          <div className="md:flex justify-center text-center md:space-x-5 xl:space-x-10">
            <button className="w-40 p-1 mt-5 bg-custom-orange border-2 border-gray-300 focus:bg-yellow-400 rounded-xl">Ajouter</button>
            <button className="w-40 p-1 mt-5 bg-custom-orange border-2 border-gray-300 focus:bg-yellow-400 rounded-xl">Modifier</button>
            <button className="w-40 p-1 mt-5 bg-custom-orange border-2 border-gray-300 focus:bg-yellow-400 rounded-xl">Supprimer</button>
          </div>
          <div className="justify-center mt-20">
            <div>
              <h3>Les labels existants :</h3>
            </div>
            <div className="md:flex m-5 md:space-x-5 xl:space-x-10 border-2 border-gray-300 rounded-xl justify-center">
              {listUniverses}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabelPannelView;
