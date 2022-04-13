import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BackendWithToken from "../../../api/backend/api.BackendWithToken";
import { getAllCategories, getAllUniverses } from "../../../api/backend/filter";
import { schemaFormLabel } from "../../constants/formik-yup/yup/yupUser";
import ShowAndDelete from "../pannel/ShowAndDelete";

/**
 * The LabelPannel page
 * 
 * The Panel of Universes, Categories and Tags controle
 * 
 * @author Brice Bayard
 */

const LabelPannel = ({showPannelLabel}) => {
  // stock the items retrieved by the back in list
  const [universes, setUniverses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [alreadyExist, setAlreadyExist] = useState(false);

  // Recover data in back
  const getAllLabels = () => {
    getAllUniverses().then(responses => {
        setUniverses(responses.data)})

    getAllCategories().then(responses => {
        setCategories(responses.data)})
  };

  useEffect(() => {
    getAllLabels();
  }, []);

  // Send label values in back for Categories
  const categorySubmit = (values) => {
    setAlreadyExist(false);
    values.label = (values.label).replaceAll(" ", "").toLowerCase();
    const labelinfo = {
      label: values.label || "defaultLabelName",
    }

    // set alreadyExist true if find the same label in list of categories
    categories.map(categorie => {
      if (categorie.label == values.label) {
        setAlreadyExist(true);
      }
    })

    if (!alreadyExist) {
      // Send with Token to match route permission for Categories
      BackendWithToken
        .post("commercial/addCategory", labelinfo)
        .then(() => {
          toast.success("Catégorie créer.");
          getAllLabels();
        })
        .catch((e) => {
          console.log(e);
          toast.error("Catégorie non créer.")
          return "error post label";
        });
      }
      else {
        toast.error("Catégorie déjà existante.")
      }
  }

  // Send label values in back for Universes
  const universeSubmit = (values) => {
    setAlreadyExist(false);
    values.label = (values.label).replaceAll(" ", "").toLowerCase();
    const labelinfo = {
      label: values.label || "defaultLabelName",
    }

    // set alreadyExist true if find the same label in list of universes
    universes.map(universe => {
      if (universe.label == values.label) {
        setAlreadyExist(true);
      }
    })

    if (!alreadyExist) {
      // Send with Token to match route permission for Universes
      BackendWithToken
        .post("commercial/addUniverse", labelinfo)
        .then(() => {
          toast.success("Univers créer.");
          getAllLabels();
        })
        .catch((e) => {
          console.log(e);
          toast.error("Univers non créer.")
          return "error post label";
        });
    }
    else {
      toast.error("Univers déjà existant.")
    }
  }
  //Valeur par defaut des champs pour la Catégorie
  const defaultValuesLabel = { label: "" };

  // Delete label values in back for Universes 
  const universeDelete = (value) => {

    // Send with Token to match route permission for Universes
    BackendWithToken
      .delete("commercial/deleteUniverse/"+value)
      .then(() => {
        toast.success("Univers supprimer.");
        getAllLabels();
      })
      .catch((e) => {
        console.log(e);
        toast.error("Univers non supprimer.")
        return "error delete label";
      });
  }

  // Delete label values in back for Universes 
  const categorieDelete = (value) => {

    // Send with Token to match route permission for Universes
    BackendWithToken
      .delete("commercial/deleteCategory/"+value)
      .then(() => {
        toast.success("Categorie supprimer.");
        getAllLabels();
      })
      .catch((e) => {
        console.log(e);
        toast.error("Categorie non supprimer.")
        return "error delete label";
      });
  }

  // stock the style to DRY x6
  const buttonPannelStyle = "w-40 mt-5 bg-custom-orange border-2 border-gray-300 focus:bg-yellow-400 rounded-xl";

  return (
    // Position of the elements below
    <div  className="flex flex-col justify-center items-center mx-6 md:mx-20 xl:mx-40 text-white">
      {/* The box container */}
      <div className="box-border m-6 border-4 w-full bg-gradient-to-tr from-gray-500 to-gray-900" hidden={showPannelLabel}>

        <div className="text-center mt-5">
          <h2 className="underline font-bold">Gestion des labels :</h2>
        </div>

        <div className="xl:flex text-center my-10 space-y-5 xl:space-y-0 xl:space-x-10 justify-center">
          {/* Formular to send the added label */}
          <Formik
              initialValues={defaultValuesLabel}
              validationSchema={schemaFormLabel}
              enableReinitialize
              onSubmit={categorySubmit}>
            {({ values }) => (
              <Form>
                <div className="flex">
                  <div className="border-2 border-gray-300 rounded-xl w-min sm:w-96 p-3 mx-auto">
                    <label htmlFor="inputPannel">Catégorie : </label>
                    <Field key="label" id="label" type="text" name="label" aria-label="inputPannel" className="rounded-md border-gray-300 bg-gray-500 placeholder-gray-400" placeholder="Label name" />
                    <button type="submit" className={buttonPannelStyle+" p-1"}>Ajouter</button>
                  </div>
                </div>
                </Form>
              )}
            </Formik>
            <Formik
              initialValues={defaultValuesLabel}
              validationSchema={schemaFormLabel}
              enableReinitialize
              onSubmit={universeSubmit}>
            {({ values }) => (
              <Form>
                <div className="flex">
                  <div className="border-2 border-gray-300 rounded-xl w-min sm:w-96 p-3 mx-auto">
                    <label htmlFor="inputPannel">Univers : </label>
                    <Field key="label" id="label" type="text" name="label" aria-label="inputPannel" className="rounded-md border-gray-300 bg-gray-500 placeholder-gray-400" placeholder="Label name" />
                    <button type="submit" className={buttonPannelStyle+" p-1"}>Ajouter</button>
                  </div>
                </div>
                </Form>
              )}
            </Formik>
        </div>

        <ShowAndDelete universeDelete={universeDelete} categorieDelete={categorieDelete} universes={universes} categories={categories} ></ShowAndDelete>

      </div>
    </div>
  );
};

export default LabelPannel;
