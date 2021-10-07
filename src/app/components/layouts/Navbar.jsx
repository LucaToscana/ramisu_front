import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { URL_HOME, URL_LOGIN } from './../../shared/constants/urls/urlConstants';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLogged, signOut } from './../../shared/redux-store/authenticationSlice';

const Navbar = () => {
    const history = useHistory()
    return (
        <nav className="top-0 fixed z-50 w-full bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
                    <div>
                        <img
                            className="h-8 w-auto sm:h-10 cursor-pointer"
                            src="https://insy2s.com/insy2s/images/Logo-insy2s-INLINE-2021.svg"
                            alt=""
                            width={200}
                            height={60}
                            onClick={history.push(URL_HOME)}
                        />
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
                <div className='link'>
                    Sign in
                </div>
            </Link>
            <Link to="/register">
                <button className="ml-8 btn btn-green">
                    Sign up
                </button>
            </Link>
        </>
    )
}