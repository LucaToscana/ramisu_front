import React from "react";

const ShowAndDelete = ({universeDelete, categorieDelete, universes, categories}) => {

  // the style for all button
  const styleListPannel = "w-40 p-1 my-2 md:space-x-5 xl:space-x-10 bg-custom-orange border-2 border-gray-300 focus:bg-yellow-400 rounded-xl whitespace-nowrap overflow-hidden overflow-ellipsis";

  // return a stylised button of each label type
  const listUniverses = universes.map(universe => {
    return (
      <button className={styleListPannel} alt={universe.label} title={universe.label} key={"universe"+universe.id} onClick={() => { universeDelete(universe.id); } }>
        <span> {universe.label} </span>
      </button>
    )
  });
  const listCategories = categories.map(categorie => {
    return (
      <button className={styleListPannel} alt={categorie.label} title={categorie.label} key={"categorie"+categorie.id} onClick={() => categorieDelete(categorie.id)}>
        <span> {categorie.label} </span>
      </button>
    )
  });
  
  return (
    <div className="w-full justify-center text-center">
        <div className="justify-center mt-20">

        {/* recover the label of Univers*/}
        <div className="m-5 border-2 border-gray-300 rounded-xl justify-center">
          <h2>Supprimer un univers</h2>
          <div className="m-5 border-2 border-gray-300 rounded-xl justify-center">
            {listUniverses}
          </div>
        </div>

        {/* recover the label of Categories*/}
        <div className="m-5 border-2 border-gray-300 rounded-xl justify-center">
          <h2>Supprimer une catégorie</h2>
          <div className="m-5 border-2 border-gray-300 rounded-xl justify-center">
            {listCategories}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ShowAndDelete;
