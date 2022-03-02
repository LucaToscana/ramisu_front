import React, { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, ShoppingCartIcon, XIcon, UserIcon , HeartIcon} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
// import { Link, useHistory } from 'react-router-dom';
import { URL_ACCOUNT, URL_REGISTRATION, URL_LOGIN , URL_CART ,URL_WISHLIST} from './../../shared/constants/urls/urlConstants';
import { useSelector, useDispatch } from 'react-redux';

import logo from "./../../assets/images/icones/logo/warhammer-shop-logo.png";
import { labelFilter } from '../../shared/redux-store/filterProductSlice';
import { selectIsLogged, signOut } from './../../shared/redux-store/authenticationSlice';
import { selectProfileInfo, getuserPicture, fetchProfile, clearUserInformations, selectProfileStatus} from './../../shared/redux-store/userProfileSlice';
import { useLocation } from 'react-router-dom'
import classNames from 'classnames/bind';// Constants used for navigating with the navbar
import { init, selectCart } from './../../shared/redux-store/cartSlice';
import {selectorFavState, fetchFav, clearFavData} from '../../shared/redux-store/favoritesSlice';
/**
 * Website navbar made with Tailwind
 * 
 * @returns the navbar object
 * 
 * @author Cecile
 */
const Navbar = () => {
    const location = useLocation()    //input filter
    const dispatch = useDispatch();
    const isLogged = useSelector(selectIsLogged);
 
    const carts = useSelector(selectCart);


    const qty  =carts.reduce((acc, elt)=>  acc + elt.quantite,0);
   
    const [navigation, setNavigation] = useState(
        [
            { name: 'Accueil',      to: '/',            current: true   },
            { name: 'Boutique',     to: '/products',    current: false  },
            { name: 'Figurines',    to: '/Figurine',    current: false  },
            { name: 'Peinture',     to: '/Peinture',    current: false  },
            { name: 'Librairie',    to: '/Librairie',   current: false  },
            { name: 'Contact',      to: '/Contact',     current: false  }
        ]
    );
    
    const [show, setShow] = React.useState();

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <Disclosure as="nav" className="top-0 sticky z-50 w-full navbar-color">
            {({ open }) => (
                <>
                    <div className='lg:flex items-center pb-2'>
                        <div className='lg:block hidden ml-10 min-w-max'>
                            {/* Website logo */}
                            <div className="">
                                <a href="/"><img
                                    className='max-h-24'
                                    src={logo}
                                    alt="Warhammer shop logo"
                                /></a>
                            </div>
                        </div>

                        <div className='text-center items-center justify-center w-full'>

                            <div className="max-w-7xl px-4 mt-1 lg:mt-5 mx-auto">

                                {/* Search bar */}
                                <div className={'flex mx-auto mb-2'}>

                                    <div className='lg:block hidden w-full'>
                                        <div className={'flex border border-gray-300 shadow-searchBar rounded-sm items-center w-full mx-10 md:mx-48 lg:mx-10'}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="#C3A758" >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                            </svg>
                                            <input type="text"/* name="query"*/ id="searchNavBar" placeholder="Rechercher" required="required" onChange={(e) => dispatch(labelFilter(e.target.value))}
                                                className={'w-full h-full text-lg text-white bg-transparent'}
                                            />
                                        </div>
                                    </div>

                                    {/* Right part of navbar - widgets */}
                                    <div className="items-center hidden lg:flex mx-6">
                                        {/* Display depending if the user is connected or not :
                                            notifications, connection / registration link, profile menu burger 
                                        */}
                                        <ConnectionStatusButtons />
                                        {isLogged && (
                                        <div className='ml-3'>
                                        <Link to={URL_WISHLIST} >
                                            <HeartIcon className={"text-[#C3A758] hover:text-white hover:cursor-pointer w-8 h-8 m-2 p-1"} />
                                        </Link>
                                        </div>
                                        )}
                                        <div className="cart-wrapper">
                                             <Link to={URL_CART} >
                                                <ShoppingCartIcon className='bg-gray-800 p-1 rounded-full text-custom-orange hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white w-8 h-8 m-2' />
                                                {qty>=1?   <span className='badge badge-warning' id='lblCartCount'> {qty}</span>:null}
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                                {  // </form>
                                }
                                <hr className='border-1 border-custom-orange' />
                                <div className="relative flex items-center justify-between h-16 mx-0 sm:mx-10 xl:mx-32">
                                    <div className="inset-y-0 left-0 flex items-center lg:hidden">

                                        {/* Mobile menu button*/}
                                        <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-lg bg-custom-orange text-black hover:text-custom-orange hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                            <span className="sr-only">Ouvrir menu</span>
                                            {open ? (
                                                <div>
                                                    <XIcon className="block absolute h-6 w-6 mt-0.5 opacity-25" aria-hidden="true" />
                                                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                                                </div>
                                            ) : (
                                                <div>
                                                    <MenuIcon className="block absolute h-6 w-6 mt-0.5 opacity-25" aria-hidden="true" />
                                                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                                </div>
                                            )}
                                        </Disclosure.Button>

                                    </div>

                                    <div className="flex-1 flex items-center lg:items-stretch mr-3">

                                        {/* Website logo */}
                                        <div className='block lg:hidden w-full'>
                                            <div className="h-16 min-w-max">
                                                <a href="/">
                                                    <img
                                                        className="h-full w-auto mx-auto"
                                                        src={logo}
                                                        alt="Warhammer shop logo"
                                                    />
                                                </a>
                                            </div>
                                        </div>

                                        {/* Right part of navbar - widgets */}
                                        <div className="flex items-center pr-2 lg:hidden">
                                            {/* Display depending if the user is connected or not :
                                                notifications, connection / registration link, profile menu burger 
                                            */}
                                            <ConnectionStatusButtons />
                                            {isLogged && (
                                                <div className='ml-3'>
                                                <Link to={URL_WISHLIST} >
                                                    <HeartIcon className={"text-[#C3A758] hover:text-white hover:cursor-pointer w-8 h-8 m-2 p-1"} />
                                                </Link>
                                                </div>
                                                )}
                                            <div className="cart-wrapper">
                                                <Link to={URL_CART} >
                                                    <ShoppingCartIcon className='bg-gray-800 p-1 rounded-full text-custom-orange hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white w-8 h-8 m-2' />
                                                    {qty>=1?   <span className='badge badge-warning' id='lblCartCount'> {qty}</span>:null}
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Link to other parts of website */}
                                        <div className="hidden lg:block my-auto w-full">
                                            <div className="flex justify-between xl:space-x-4">
                                                {navigation.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        to={item.to}
                                                        className={classNames(
                                                            item.to == location.pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'px-3 py-2 rounded-lg text-lg font-medium'
                                                        )}
                                                        aria-current={item.to == location.pathname ? 'page' : undefined}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <Disclosure.Panel className="lg:hidden">
                                <div className="px-2 pt-2 pb-3 space-y-1">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            className={classNames(
                                                item.to == location.pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block px-3 py-2 rounded-lg text-base font-medium'
                                            )}
                                        >
                                            <Link
                                                key={item.name}
                                                to={item.to}
                                            >
                                                {item.name}
                                            </Link>

                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    )
}

export default Navbar


/**
 * Display buttons depending if the user is connected or not.
 * 
 * @returns the buttons depending of the user connection status
 * 
 * @author Cecile
 */
const ConnectionStatusButtons = () => {

    const dispatch = useDispatch();
    const isLogged = useSelector(selectIsLogged);
    const profileData = useSelector(selectProfileInfo);
    const profileStatus = useSelector(selectProfileStatus);
    
    const favState = useSelector(selectorFavState); 
    
  

    if (isLogged) {

       
        if(favState=='idle')dispatch(fetchFav())
        if(profileStatus=='idle')dispatch(fetchProfile())
      

        /* Connected user buttons and menu */
        return (
            <>
                {/* Notification bell icon */}
             <div  className='animate-wiggle'>   <button
                    type="button"
                    className="bg-transparent	p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white sm:ml-7"
                >
                    <span className="sr-only bg-transparent	">Voir les notifications</span>
                    <BellIcon className="h-6 w-6 bg-transparent" aria-hidden="true" />
                </button>
                </div>
                {/* User burger menu */}
                <Menu as="div" className="ml-3">
                    <div>
                        <Menu.Button className="bg-gray-800 flex text-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white w-8">
                            <span className="sr-only">Ouvrir le menu utilisateur</span>
                            <img
                                className="p-0.5 h-8 w-8 rounded-full bg-white object-contain"
                                src={getuserPicture(profileData.avatar)}
                                alt=""
                            />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute -ml-24 z-50 mt-2 w-48 rounded-lg shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link to={URL_ACCOUNT}
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-lg text-gray-700')}
                                    >
                                        Gérer votre compte
                                    </Link>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        to="#"
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-lg text-gray-700')}
                                        onClick={() => {
                                            dispatch(signOut());
                                            dispatch(clearUserInformations());
                                            dispatch(clearFavData());
                                            dispatch(init());
                                            // history.push(URL_HOME)
                                        }}
                                    >
                                        Se déconnecter
                                    </Link>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </>
        )

    } else {

        /* Displayed buttons if the user is not connected */
        return (
            <div>
                <div className="hidden lg:block lg:ml-6">
                    <div className="flex justify-between">
                        <Link
                            to={URL_REGISTRATION}
                            className='text-gray-300 hover:bg-gray-700 hover:text-white
                            px-3 py-2 rounded-lg text-lg font-medium'>
                            <span>S'inscrire</span>

                        </Link>
                        <Link
                            to={URL_LOGIN}
                            className='text-gray-300 hover:bg-gray-700 hover:text-white
                            px-3 py-2 rounded-lg text-lg font-medium whitespace-nowrap'>
                            Se connecter
                        </Link>
                    </div>
                </div>
                <div className="lg:hidden block">
                    <Menu as="div"
                        className="relative">
                        <Menu.Button>
                            <UserIcon className='bg-custom-orange rounded-full p-1 mt-3 text-gray-800 w-8 h-8 m-2' />
                        </Menu.Button>
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className='flex flex-col'>
                                <Menu.Item>
                                    <Link
                                        to={URL_REGISTRATION}
                                        className='text-gray-900 px-3 py-2 rounded-lg text-sm font-medium'>
                                        <span>S'inscrire</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link
                                        to={URL_LOGIN}
                                        className='text-gray-900 px-3 py-2 rounded-lg text-sm font-medium'>
                                        Se connecter
                                    </Link>
                                </Menu.Item>
                            </div>

                        </Menu.Items>
                    </Menu>

                </div>
            </div>)
    }
}

