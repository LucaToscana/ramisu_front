import {  FastForwardIcon } from "@heroicons/react/solid";
import React from "react";
import { useHistory } from "react-router-dom";
import { URL_PAIEMENT_2 } from "../../constants/urls/urlConstants";


export function ButtonToPayer() {
  const history = useHistory();

  const test = () => {
    if (localStorage.getItem("myAddress") !== null) {
      const address = JSON.parse(localStorage.getItem("myAddress"))
      if ((address.number === null) ||
        address.street === null ||
        address.postalCode === null ||
        address.city === null ||
        address.country === null ||
        address.isMain === null) {
        return false
      } else {
        return true
      }
    }
  }


  return (

    <div className="flex justify-end" >
      <div className="flex items-center"><p className={test() === true ? "text-center font-bold text-green-600" : "text-center "}>{test() ? "Continuer l'achat" : "Entrer une adresse de livraison"}</p></div>
      <div className="ml-8"> <button> <FastForwardIcon className={test() ? 'h-16 w-16 iconTrue animate-bounce  ' : 'h-16 w-16'}
        onClick={() => { if (test()) { history.push(URL_PAIEMENT_2) } }} /></button></div>
    </div>
  );
}

