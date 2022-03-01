import React from "react";

/**
 * The Panel of Universes, Categories and ?? Tags ?? controle
 *
 * @returns the UniversPanelView page
 */

const UniversPanelView = () => {

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
              <button className="w-40 p-1 my-2 bg-custom-orange border-2 border-gray-300 focus:bg-yellow-400 rounded-xl whitespace-nowrap overflow-hidden overflow-ellipsis">Label - 1 0 0 0 0 0 00 0000 0 </button>
              <button className="w-40 p-1 my-2 bg-custom-orange border-2 border-gray-300 focus:bg-yellow-400 rounded-xl whitespace-nowrap overflow-hidden overflow-ellipsis">Label - 2 </button>
              <button className="w-40 p-1 my-2 bg-custom-orange border-2 border-gray-300 focus:bg-yellow-400 rounded-xl whitespace-nowrap overflow-hidden overflow-ellipsis">Label - 3 </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversPanelView;
