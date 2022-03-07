import { ClipboardListIcon, CollectionIcon } from "@heroicons/react/outline";
import React from "react";
import { useHistory } from "react-router-dom";
import { URL_ORDERS_COMMERCIAL } from "../shared/constants/urls/urlConstants";

/**
 * The user page account with multiple links (cart, user infos, orders...)
 *
 * @returns the AccountView page
 */

 const BackOffice = () => {
    const history = useHistory()

    return (
    <div  style={{ height: 700 }} className="flex justify-center  item-center p-10 ">
        


                            <div className='flex justify-center m-2 text-xs w-full	'>
                                <button className="paiementCart h-1/6" onClick={()=>{history.push(URL_ORDERS_COMMERCIAL)}} > <div className=" grid grid-cols-4  ">
                                    <p className="lg:text-lg text-xs lg:text:md col-span-3 lg:col-span-3  mt-2 pl-2 lg:mt-1 mobile:text-xs">GESTION  ORDERS</p>
                                    
                                    <ClipboardListIcon className="lg:w-7 w-6 m-1 ml-2 "></ClipboardListIcon></div> </button>
                            </div>

        
        
        
        </div>)

}


export default BackOffice;