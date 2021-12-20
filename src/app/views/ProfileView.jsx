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
                <div className="box-border p-6 border-4 text-xl shadow-xl">
                    <div>Prenom: {profile.lastName}</div>
                    <div>Nom: {profile.firstName}</div>
                    <div>Date de naissance: {profile.birthdate}</div>
                    <div>Mail: {profile.mail}</div>
                    <div>Adresse:{profile.number + " " + profile.street}</div>
                    <div>Tél: {profile.phone}</div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;