
import React, { useEffect, useState } from 'react';
import {ViewGridIcon, ViewListIcon } from '@heroicons/react/solid';
const  SwitchLayout = ({callback})=>{

    const [active, setActive] = useState(true);

    useEffect(()=>{
       callback(active)
    }, [active])

    return (<div className="hidden md:block bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
                <button onClick={()=>setActive(true)} 
                        className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none  focus:text-blue-400 rounded-l-full px-4 py-2 ${active ? "active" : ""}`} >
                    <ViewGridIcon width={32}  height={32} />
                </button>
                
                <button onClick={()=>setActive(false)} 
                        className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none  focus:text-blue-400 rounded-l-full px-4 py-2 ${active ? "" : "active"}`} >
                    <ViewListIcon width={32} height={32} />
                </button>
            </div>);
}


export default SwitchLayout;