import React, { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, ShoppingCartIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
// import { Link, useHistory } from 'react-router-dom';
import { URL_ACCOUNT, URL_INSCRIPTION, URL_LOGIN , URL_ADMIN_HOME} from './../../shared/constants/urls/urlConstants';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLogged, selectIsLoggedAdmin , signOut } from './../../shared/redux-store/authenticationSlice';
import joey from "../../assets/images/joey.jpg";
import logo from "./../../assets/images/icones/logo/warhammer-shop-logo.png";
import { labelFilter } from '../../shared/redux-store/filterProductSlice';



// Constants used for navigating with the navbar
const navigation = [
    { name: 'Accueil', to: '/', current: true },
    { name: 'Boutique', to: '/products', current: false },
    { name: 'Figurines', to: '#', current: false },
    { name: 'Peinture', to: '#', current: false },
    { name: 'Librairie', to: '#', current: false },
    { name: 'Contact', to: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


/**
 * Website navbar made with Tailwind
 * 
 * @returns the navbar object
 * 
 * @author Cecile
 */
const Navbar = () => {
//input filter
const dispatch = useDispatch();
    // const history = useHistory()
   
    return (
        <Disclosure as="nav" className="top-0 sticky z-50 w-full navbar-color">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-2">

                        {/* Search bar */}
                        <form action="/search" className="flex flex-wrap lg:flex-row" >
                            <input type="search" name="query" placeholder="Rechercher" required="required" onChange={(e)=>dispatch(labelFilter(e.target.value))}
                                className="items-center w-full max-w-lg mx-auto h-12 px-4 text-lg text-gray-700 bg-white border border-gray-300 rounded-lg lg:w-1/2 xl:transition-all 
                            xl:duration-300  lg:h-10 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-teal-500 
                            dark:focus:border-teal-500 focus:outline-none focus:ring focus:ring-primary dark:placeholder-gray-400 focus:ring-opacity-40"
                            />
                        </form>

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

                            <div className="flex-1 flex items-center justify-center lg:items-stretch lg:justify-start">

                                {/* Website logo */}
                                <div className="flex-shrink-0 flex items-center">
                                    <img
                                        className="block lg:hidden h-8 w-auto"
                                        src={logo}
                                        alt="Warhammer shop logo"
                                    />
                                    <img
                                        className="hidden lg:block h-8 w-auto"
                                        src={logo}
                                        alt="Warhammer shop logo"
                                    />
                                </div>

                                {/* Link to other parts of website */}
                                <div className="hidden lg:block lg:ml-6">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.to}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'px-3 py-2 rounded-lg text-lg font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
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
                                <Link
                                    to="/panier"
                                >
                                    <ShoppingCartIcon className='bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white w-8 h-8 m-2' />
                                </Link>
                             
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="lg:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
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
    const displayAdmin = useSelector(selectIsLoggedAdmin);
    const dispatch = useDispatch();

    if (isLogged) {

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
                                className="h-8 w-8 rounded-full"
                                src={joey}
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
                                        Profil
                                    </Link>
                                )}
                            </Menu.Item>
                          {      displayAdmin &&  (
                            <Menu.Item>
                            { 
                              ({ active }) => (
                          
                                       <Link
                                            key="isAdmin"
                                            to={URL_ADMIN_HOME}
                                            aria-current="button Admin"
                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-lg text-gray-700')}>
                                                Tableau de bord
                                        </Link>
                               ) }
                               </Menu.Item>
                            )}
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        to="#"
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-lg text-gray-700')}
                                    >
                                        Changer les informations du compte
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        to="#"
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-lg text-gray-700')}
                                        onClick={() => dispatch(signOut())}
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
            <div className="hidden lg:block lg:ml-6">
                <div className="flex space-x-4">
                    <Link
                        to={URL_INSCRIPTION}
                        className='text-gray-300 hover:bg-gray-700 hover:text-white
                        px-3 py-2 rounded-lg text-lg font-medium'>
                        S'inscrire
                    </Link>
                    <Link
                        to={URL_LOGIN}
                        className='text-gray-300 hover:bg-gray-700 hover:text-white
                        px-3 py-2 rounded-lg text-lg font-medium'>
                        Se connecter
                    </Link>
                </div>
            </div>
        )
    }
}
