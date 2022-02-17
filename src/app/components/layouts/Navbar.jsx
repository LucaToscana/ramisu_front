import React, { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, ShoppingCartIcon, XIcon, UserIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
// import { Link, useHistory } from 'react-router-dom';
import { URL_ACCOUNT, URL_REGISTRATION, URL_LOGIN } from './../../shared/constants/urls/urlConstants';
import { useSelector, useDispatch } from 'react-redux';
import joey from "../../assets/images/joey.jpg";
import logo from "./../../assets/images/icones/logo/warhammer-shop-logo.png";
import { labelFilter } from '../../shared/redux-store/filterProductSlice';
import { selectIsLogged, selectIsLoggedAdmin, signOut } from './../../shared/redux-store/authenticationSlice';
import { selectProfileInfo, getuserPicture, isUpdated, clearUserInformations, setProfileInfo } from './../../shared/redux-store/userProfileSlice';
import { useLocation } from 'react-router-dom'
import { getProfile } from "../../api/backend/user";
import classNames from 'classnames/bind';// Constants used for navigating with the navbar
import { init, selectCart } from './../../shared/redux-store/cartSlice';
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
    const carts = useSelector(selectCart)

    let qty = 0;

    for (let i = 0; i < carts.length; i++) {
        qty +=+( carts[i].quantite*1)
    }
    const [navigation, setNavigation] = useState([
        { name: 'Accueil', to: '/', current: true },
        { name: 'Boutique', to: '/products', current: true },
        { name: 'Figurines', to: '/Figurine', current: true },
        { name: 'Peinture', to: '/Peinture', current: true },
        { name: 'Librairie', to: '/Librairie', current: true },
        { name: 'Contact', to: '/Contact', current: false },])








    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <Disclosure as="nav" className="top-0 sticky z-50 w-full navbar-color">
            {({ open }) => (
                <>
                    <div className='lg:flex items-center'>
                        <div className='lg:block hidden h-auto'>
                            {/* Website logo */}
                            <div className="h-full">
                                <img
                                    className='w-full max-h-24'
                                    src={logo}
                                    alt="Warhammer shop logo"
                                />
                            </div>
                        </div>

                        <div className='text-center items-center justify-center'>

                            <div className="max-w-7xl px-4 pt-2">

                                {/* Search bar */}
                                {// <form action="/search" className="flex flex-wrap lg:flex-row" >
                                }<div className='flex flex-wrap lg:flex-row'>
                                    {/* <h1 className='text-xl md:text-4xl text-white flex items-center w-full md:w-1/2 justify-center'>WarMarket</h1> */}
                                    <input type="text"/* name="query"*/ id="searchNavBar" placeholder="Rechercher" required="required" onChange={(e) => dispatch(labelFilter(e.target.value))}
                                        className="items-center w-full max-w-lg mx-auto h-12 px-4 text-lg text-gray-700 bg-white border border-gray-300 rounded-lg lg:w-1/6 xl:transition-all 
                                    xl:duration-300  lg:h-10 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-teal-500 
                                    dark:focus:border-teal-500 focus:outline-none focus:ring focus:ring-primary dark:placeholder-gray-400 focus:ring-opacity-40"
                                    /></div>
                                {  // </form>
                                }
                                <div className="relative flex items-center justify-between h-16">
                                    <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">

                                        {/* Mobile menu button*/}
                                        <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                            <span className="sr-only">Ouvrir menu</span>
                                            {open ? (
                                                <XIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>

                                    </div>

                                    <div className="flex-1 flex items-center lg:items-stretch mr-3">

                                        {/* Website logo */}
                                        <div className="block lg:hidden h-16 min-w-max mx-auto">
                                            <img
                                                className="h-full w-auto"
                                                src={logo}
                                                alt="Warhammer shop logo"
                                            />
                                        </div>

                                        {/* Link to other parts of website */}
                                        <div className="hidden lg:block my-auto w-full">
                                            <div className="flex justify-between">
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

                                    {/* Right part of navbar - widgets */}
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0">

                                        {/* Display depending if the user is connected or not :
                                            notifications, connection / registration link, profile menu burger 
                                        */}
                                        <ConnectionStatusButtons />
                                        <div className="cart-wrapper">
                                            <Link
                                                to="/panier"
                                            >
                                                <ShoppingCartIcon className='bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white w-8 h-8 m-2' />
                                            {qty>=1?   <span className='badge badge-warning' id='lblCartCount'> {qty}</span>:null}
                                            </Link>
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

    const isLogged = useSelector(selectIsLogged);
    const profileData = useSelector(selectProfileInfo);
    const dispatch = useDispatch();
    // const history = useHistory()



    if (isLogged) {

        if (profileData.updated === false) {
            getProfile().then((response) => {
                dispatch(setProfileInfo(response.data));
                dispatch(isUpdated(true))
            }).catch(e => {
                console.error("error edite profile", e)
            });
        }


        /* Connected user buttons and menu */
        return (
            <>
                {/* Notification bell icon */}
                <button
                    type="button"
                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                    <span className="sr-only">Voir les notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* User burger menu */}
                <Menu as="div" className="ml-3 relative">
                    <div>
                        <Menu.Button className="bg-gray-800 flex text-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Ouvrir le menu utilisateur</span>
                            <img
                                className="p-1 h-8 w-8 rounded-full bg-white  object-contain"
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
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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
            <div className='w-full'>
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
                            <UserIcon className='bg-gray-800 p-1 mt-3 text-gray-400 w-8 h-8 m-2' />
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

