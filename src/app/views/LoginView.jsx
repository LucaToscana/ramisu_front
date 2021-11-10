import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { signIn } from '../shared/redux-store/authenticationSlice';
import { authenticate } from './../api/backend/account';
import { URL_HOME } from './../shared/constants/urls/urlConstants';
import { isAuthenticated } from './../shared/services/accountServices';
import Login from './../components/account/Login';

/**
 * View/Page Login
 * 
 * @param {object} history 
 * @author Peter Mollet
 */
 const LoginView = ({ history }) => {

    const [errorLog, setErrorLog] = useState(false)
    const dispatch = useDispatch()

    const handleLogin = (values) => {
        authenticate(values).then(res => {
            if(res.status === 200 && res.data.token) {
                dispatch(signIn(res.data.token))
                if(isAuthenticated) history.push(URL_HOME)
            }
        }).catch(() => setErrorLog(true))
    }

    return (
        <div className="">
            <Login submit={handleLogin} errorLog={errorLog} />
        </div>
    );
};

export default LoginView