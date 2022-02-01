import React, { useState } from 'react'
import { register } from '../api/backend/account';
import { URL_LOGIN} from '../shared/constants/urls/urlConstants';
import Register from '../components/account/Register';



/**
 * View/Page Login
 * 
 * @param {object} history 
 * @author Luca Toscana
 */
const RegisterView = ({ history }) => {

    const [errorLog, setErrorLog] = useState(false)

    const handleInscription = (values) => {

        // debugger

        register(values).then(res => {
            if (res.status === 200 ) {
                history.push(URL_LOGIN)
           
            }
        }).catch(() => setErrorLog(true))
    }

    return (
    
            <div className="md:flex md:justify-center">
                <Register submit={handleInscription} errorLog={errorLog}  />
            </div>
        

    );
};

export default RegisterView