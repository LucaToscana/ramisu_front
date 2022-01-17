import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import person from "../assets/images/icones/person.svg";
import { getProfile } from "../api/backend/user";

const ProfileView = () => {

    const history = useHistory();
    const [profile, setProfile] = useState([])
    useEffect(() => {
        getProfile().then(res => {
            setProfile(res.data)
        })
    }, [])
    return (
        <div className=''>
            <h1 className="font-semibold text-center text-2xl ">
                <img className="w-6 inline " src={person} alt='' />Données du compte</h1>
            <div className="flex flex-col justify-center items-center m-5 ">
            <form action="#" className='flex flex-col items-center'>
            <div>
                <div className='border flex justify-between items-center '>
                    <label className='mr-4'>Prenom : </label>
                    <input className='text-center' defaultValue={profile.lastName} type="text" />
                  </div>

                  <div className='border flex justify-between items-center '>
                    <label className='mr-4'>Nom : </label>
                    <input className='text-center' defaultValue={profile.firstName} type="text" />
                  </div>

                  <div className='border flex justify-between items-center '>
                    <label className='mr-4'>Date de naissance : </label>
                    <input className='text-center' defaultValue={profile.birthdate} type="text" />
                  </div>

                  <div className='border flex justify-between items-center '>
                    <label className='mr-4'>Mail : </label>
                    <input className='text-center' defaultValue={profile.mail} type="text" />
                  </div>

                  <div className='border flex justify-between items-center '>
                    <label className='mr-4'>Adresse : </label>
                    <input className='text-center' defaultValue={profile.number} type="text" />
                    <input className='text-center' defaultValue={profile.street} type="text" />
                  </div>
                  <div className='border flex justify-between items-center '>
                    <label className='mr-4'>Tél : </label>
                    <input className='text-center' defaultValue={profile.phone} type="text" />
                  </div>
            
                  </div>
                  <img src={avatar} width="300px" height="100%" className='ml-6 block mt-5'/>
                  <button type="submit" className="bg-stone-900 text-white p-2 mt-5">Mettre à jour</button>
                </form>
            </div>
        </div>
    );
};

export default ProfileView;