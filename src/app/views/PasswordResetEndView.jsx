import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import { resetPasswordEnd } from '../api/backend/account';
import PasswordResetForm from '../components/account/PasswordResetForm';
import { URL_HOME } from './../shared/constants/urls/urlConstants';

/**
 * Forgotten password page view : check the user new password
 * and send it to the Back-end with a token to validate the change
 * 
 * @param {object} history 
 * @author Cecile
 */
const PasswordResetEndView = ({ history }) => {
    
    const [errorLog, setErrorLog] = useState(false)
    const { key } = useParams();

    const handleSetNewPassword = (values) => {

        let passwordReset = {
            key: key,
            newPassword: values.newPassword,
        }

        resetPasswordEnd(passwordReset).then(response => {
            if (response.status === 200) {
                history.push(URL_HOME)
            }
        }).catch(() => setErrorLog(true))
    }

    return (
        <div className=''>
            <div className="md:flex md:justify-center">
                <PasswordResetForm submit={handleSetNewPassword} errorLog={errorLog} />
            </div>
        </div>

    );
};

export default PasswordResetEndView