import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../shared/redux-store/authenticationSlice';
import { URL_CART } from './../shared/constants/urls/urlConstants';
import boxes from "../assets/images/icones/boxes.png";
import userProfile from '../assets/images/icones/user.png';
import shoppingCart from '../assets/images/icones/shopping-cart.png';
import heart from '../assets/images/icones/heart.png';
import creditCard from '../assets/images/icones/credit-card.png';
import key from '../assets/images/icones/key.png';
import powerButton from '../assets/images/icones/power-off.png';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

/**
 * The user page account with multiple links (cart, user infos, orders...)
 * 
 * @returns the AccountView page
 */

const AccountView = () => {

    const navigation = [
        { name: 'Commandes', href: '#', image: boxes },
        { name: 'Données du compte', href: '#', image: userProfile },
        { name: 'Panier', href: URL_CART, image: shoppingCart },
        { name: 'Favoris', href: '#', image: heart },
        { name: 'Moyens de paiement', href: '#', image: creditCard },
        { name: 'Gestion du mot de passe', href: '#', image: key },
    ]

    return (

        // Position of the elements below
        <div className="flex flex-col justify-center items-center m-5">
            {/* The box container characteristics */}
            <div className="box-border p-6 border-4 lg:w-3/6 sm:w-1/3 ">
                {/* Grid system of the box content */}
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 place-content-center">

                    {/* The different links in the box container */}
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                        >
                            {/* Hovering effect */}
                            <div className='flex justify-center items-center text-sm font-medium object-contain text-black hover:bg-gray-400 hover:text-black px-2 rounded-md object-center'>

                                {/* Grid system for the image and link */}
                                <div className="grid grid-cols-3 w-40 pt-3 align-middle">

                                    {/* Image takes up 1 column */}
                                    <img className="h-50 col-span-1" src={item.image} alt='' />
                                    {/* Link takes up 2 columns */}
                                    <div className="col-span-2">
                                        {item.name}
                                    </div>

                                </div>

                            </div>
                        </a>
                    ))}

                    <DisconnectionLink />

                </div>
            </div>
        </div>
    )
}

export default AccountView;

const DisconnectionLink = () => {
    const dispatch = useDispatch();

    return (

        <a
            key="Déconnexion"
            href=" "
            className={classNames(
                'flex flex-col justify-center items-center text-sm font-medium object-contain'
            )}
            onClick={() => dispatch(signOut())}
        >
            {/* Hovering effect */}
            <div className='text-black hover:bg-gray-400 hover:text-black px-2 rounded-md'>

                {/* Grid system for the image and link */}
                <div className="grid grid-cols-3 w-40 pt-3 align-middle">

                    {/* Image takes up 1 column */}
                    <img className="h-50 col-span-1" src={powerButton} alt='' />
                    {/* Link takes up 2 columns */}
                    <div className="col-span-2">
                        Se déconnecter
                    </div>
                </div>
            </div>
        </a>
    )
}