import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { URL_HOME, URL_LOGIN } from './../../shared/constants/urls/urlConstants';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLogged, signOut } from './../../shared/redux-store/authenticationSlice';
import HamburgerMenu from './HamburgerMenu';

const Navbar = () => {
    const history = useHistory()
    return (
        <nav className="top-0 fixed z-50 w-full navbar-color shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
    
                    <div className="bm-burger-button">
                        <HamburgerMenu/>
                    </div>
    
                    <div>
                        <Link to={URL_HOME}>
                            <img
                                className="h-8 w-auto sm:h-10 cursor-pointer"
                                src='/warhammer-shop-logo.png'
                                alt="Warhammer Market Logo"
                                width={200}
                                height={60}
                            />
                        </Link>
                    </div>

                    <div className="flex items-center justify-end flex-1 lg:w-0">
                        <ConnectionBtn/>
                    </div>

                </div>

            </div>
        </nav>
    )
}

export default Navbar


const ConnectionBtn = () => {
    const isLogged = useSelector(selectIsLogged)
    const dispatch = useDispatch()
    if(isLogged)
    return(
        <button className="ml-8 btn btn-green" onClick={() => dispatch(signOut())}>
            Sign out
        </button>
    )
    else return(
        <>
            <Link to={URL_LOGIN}>
                <div className='ml-8 btn btn-primary'>
                    S'identifier
                </div>
            </Link>
            <Link to="/register">
                <button className="ml-8 btn btn-green">
                    S'inscrire
                </button>
            </Link>
        </>
    )
}
