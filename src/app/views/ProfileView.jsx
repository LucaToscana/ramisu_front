import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { getProfile, updateProfile } from "../api/backend/user";

import Profile from '../components/account/Profile'

const ProfileView = () => {

    const history = useHistory();
    
    const [profileData, setProfileData] = useState({    firstName: '', lastName: '', birthdate: '', email: '', street:'', number: '', phone : '', city:'' , postalCode:'', country:''});

    useEffect(() => {
        getProfile().then(res => {
            setProfileData(res.data);  
        });
    }, []);

    const formHandler = (values)=>{
      
        updateProfile(values).then(res=>{
                
                if(res.data=="OK")
                {
                    getProfile().then(res => {
                        setProfileData(res.data);  
                    });
                }
        }).catch(e=>{
            console.error("error edite profile", e)
        });
    }
 

    return (
        <div className=''>
          
                <Profile submit={formHandler} data={profileData} />
          
        </div>
    )
        
}


export default ProfileView;