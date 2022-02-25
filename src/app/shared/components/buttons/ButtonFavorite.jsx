import React from 'react';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { selectIsLogged } from './../../../shared/redux-store/authenticationSlice';
import { useSelector } from 'react-redux';

const ButtonFavorite = (props)=>{

    const [toggle , setToggle ] = useState(false);
    const isLogged = useSelector(selectIsLogged);
    
    const clickHandler = (event)=>{
        setToggle(!toggle);
        console.log(event);
    }

    const  getDivStyle = ()=>{
           // 
        const style = "p-2 rounded-2xl m-1 p-3 hover:cursor-pointer";
        if(toggle)return "p-2 bg-[#ff0000] " +style;
        return   "login " + style;
    }

    return (    <div>
                {!isLogged ? (<></>):(
                <div className={getDivStyle()}>
                    <HeartIcon  width={32}  height={32} onClick={clickHandler} className={toggle ?   "text-white " : "text-black"}/>
                </div>)}
                </div>) ;
}

export default ButtonFavorite;  