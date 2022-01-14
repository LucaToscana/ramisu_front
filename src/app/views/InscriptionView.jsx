import React, { useState } from 'react'
import { signIn } from '../shared/redux-store/authenticationSlice';
import { inscription } from '../api/backend/account';
import { URL_HOME } from '../shared/constants/urls/urlConstants';
import { isAuthenticated } from '../shared/services/accountServices';
import Login from '../components/account/Login';
import Inscription from '../components/account/Inscription';
import AddressInput from '../components/account/AddressInput';

import {useSelector, useDispatch} from 'react-redux'


/**
 * View/Page Login
 * 
 * @param {object} history 
 * @author Luca Toscana
 */
const InscriptionView = ({ history }) => {
    const selector = useSelector(state => state.addresse)

    const [errorLog, setErrorLog] = useState(false)

    const handleInscription = (values) => {


        alert(  JSON.stringify(values))


        inscription(values).then(res => {
            if (res.status === 200 /*&& res.data.token*/) {
             /*   dispatch(signIn(res.data.token))
                if (isAuthenticated) history.push(URL_HOME)*/
            }
        }).catch(() => setErrorLog(true))
    }

    return (
        <div className=''>
            <div className="md:flex md:justify-center">

                <Inscription submit={handleInscription} errorLog={errorLog}  address={selector}/>
            </div>
        </div>

    );
};

export default InscriptionView