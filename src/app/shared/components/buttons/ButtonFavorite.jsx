import React from 'react';
import { HeartIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { selectIsLogged } from './../../../shared/redux-store/authenticationSlice';
import { useSelector } from 'react-redux';
import {addFavorite, removeFavorite } from '../../../api/backend/user'

const ButtonFavorite = ({id})=>{

    const [ toggle , setToggle ] = useState( false );
    const isLogged = useSelector(selectIsLogged);
    
    const clickHandler = (event)=>{

        if(!toggle)add();
        else rm();

        setToggle(!toggle);

    }

    const  getDivStyle = ()=>{
        
        const style = "p-2 rounded-2xl m-1 p-3 hover:cursor-pointer";
        if(toggle)return "p-2 bg-[#ff0000] " +style;
        return   "login " + style;
    }


    const add=()=>
    {
        addFavorite(id).then((res)=>{
         
        }).catch(error=>console.log(error))
    }

    const rm = ()=>
    {
            removeFavorite(id).then((res)=>
            {
                console.log(res);
            }).catch(error=>console.log(error));
    }

 

    return (    <div>
                {!isLogged ? (<></>):(
                    <div className={getDivStyle()}>
                        <HeartIcon  width={32}  height={32} onClick={clickHandler} className={toggle ?   "text-white " : "text-black"}/>
                    </div>
                )}
                </div>) ;
}

export default ButtonFavorite;  