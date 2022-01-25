import { CheckIcon, FastForwardIcon, RewindIcon } from "@heroicons/react/solid";
import React from "react";
import { useHistory } from "react-router-dom";
import { URL_PAIEMENT_2 } from "../../constants/urls/urlConstants";


export function ButtonToPayer() {
  const history = useHistory();

const test =()=>{


  if(localStorage.getItem("myAddress")!==null){
    history.push(URL_PAIEMENT_2)} 
  
}

  return (
    
     <div >
     <FastForwardIcon className=' h-11 w-11 iconTrue' onClick={()=>test()} /> 
    </div>
  );
}

