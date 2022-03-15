import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import apiBackEnd from "../api/backend/api.Backend";
import { getAllCategories, getAllUniverses, getAllTags } from '../api/backend/filter';

/**
 * The LabelPannelView page
 * 
 * The Panel of Universes, Categories and Tags controle
 * 
 * @author Brice Bayard
 */

const LabelPannelView = () => {
  
  // stock the items retrieved by the back in list
  const [categories, setCategories] = useState([]);
  const [universes, setUniverses] = useState([]);
  const [tags, setTags] = useState([]);

  // switch visibility of label type
  const [showCategories, setShowCategories] = useState(false);
  const [showUniverses, setShowUniverses] = useState(false);
  const [showTags, setShowTags] = useState(false);

  // Recover data in back
  useEffect(() => {
    getAllCategories().then(responses => {
        setCategories(responses.data)})

    getAllUniverses().then(responses => {
        setUniverses(responses.data)})
        
    getAllTags().then(responses => {
        setTags(responses.data)})
  }, []);

  // Send label values in back and labelType is categories, universes or tags
  const labelSubmit = (values, labelType) => {
    const labelinfo = {
      refcode: values.refcode || null,
      label: values.label || "defaultLabelName",
    }

    // Envoi
    apiBackEnd
      .post("public/categories", labelinfo)
      .then((res) => {
        //Mise à jour des informations utilisateur
        setCategories(res.data);
      })
      .catch((e) => {
        return "error post user";
      });
  }


  // stock the style to DRY x3
  const styleListPannel = "w-40 p-1 my-2 md:space-x-5 xl:space-x-10 bg-custom-orange border-2 border-gray-300 focus:bg-yellow-400 rounded-xl whitespace-nowrap overflow-hidden overflow-ellipsis";
  
  // return a stylised button of each label type
  const listCategories = categories.map(categorie => {
    return (
      <button className={styleListPannel} alt={categorie.label} title={categorie.label} key={"categorie"+categorie.id}>
      <span> {categorie.label} </span>
      </button>
    )
  });
  const listUniverses = universes.map(universe => {
    return (
      <button className={styleListPannel} alt={universe.label} title={universe.label} key={"universe"+universe.id}>
      <span> {universe.label} </span>
      </button>
    )
  });
  const listTags = tags.map(tag => {
    return (
      <button className={styleListPannel} alt={tag.label} title={tag.label} key={"tag"+tag.id}>
      <span> {tag.label} </span>
      </button>
    )
  });

  // stock the style to DRY x6
  const buttonPannelStyle = "w-40 mt-5 bg-custom-orange border-2 border-gray-300 focus:bg-yellow-400 rounded-xl";

  return (
    // Position of the elements below
    <div  className="flex flex-col justify-center items-center mx-6 md:mx-20 xl:mx-40 text-white">
      {/* The box container */}
      <div className="box-border m-6 border-4 w-full min-h-[500px] bg-gradient-to-tr from-gray-500 to-gray-900">
        <div className="text-center mt-5">
          <h2 className="underline font-bold">Gestion des labels :</h2>
        </div>
        {/* Button to hide each label type separately */}
        <div className="md:flex justify-center text-center md:space-x-5 xl:space-x-10 mt-5">
          <button className={buttonPannelStyle+" p-5"}  onClick={() => setShowCategories(!showCategories)}>Catégories</button>
          <button className={buttonPannelStyle+" p-5"} onClick={() => setShowUniverses(!showUniverses)}>Univers</button>
          <button className={buttonPannelStyle+" p-5"} onClick={() => setShowTags(!showTags)}>Tags</button>
        </div>
        <Formik
            enableReinitialize
            onSubmit={labelSubmit}>
          {({ values }) => (
            <Form>
              <div className="text-center mt-10">
                <div className="flex">
                  <div className="border-2 border-gray-300 rounded-xl w-min sm:w-96 p-3 mx-auto">
                    <label htmlFor="inputPannel">Label : </label>
                    <input type="text" aria-label="inputPannel" className="rounded-md border-gray-300 bg-gray-500 placeholder-gray-400" placeholder="Label name" />
                    <button className={buttonPannelStyle+" p-1"}>Ajouter</button>
                  </div>
                </div>
                <div className="justify-center mt-20">
                  <div>
                    <h3>Les labels existants :</h3>
                    <button className={buttonPannelStyle+" p-1"}>Supprimer</button>
                  </div>
                  {/* recover all label type in the box with possibility to hide them */}
                  <div className="m-5 border-2 border-gray-300 rounded-xl justify-center">
                    <span hidden={!showCategories}> {listCategories} </span>
                    <span hidden={!showUniverses}> {listUniverses} </span>
                    <span hidden={!showTags}> {listTags} </span>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LabelPannelView;
