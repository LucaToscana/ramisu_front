import { CheckIcon, RewindIcon } from "@heroicons/react/solid";
import React from "react";
import { useHistory } from "react-router-dom";


export function ButtonBack() {
  const history = useHistory();



  return (
    
     <div>
     <RewindIcon className='ml-2 h-11 w-11 iconTrue' onClick={()=>  history.goBack()} /> 
    </div>
  );
}

