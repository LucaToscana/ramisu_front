import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import { resetPasswordEnd } from '../api/backend/account';
import PasswordResetForm from '../components/account/PasswordResetForm';
import { URL_HOME } from './../shared/constants/urls/urlConstants';
import { resetPasswordCheckTokenValidity } from '../api/backend/account';
import Loader from './../shared/components/utils-components/Loader';

/**
 * Forgotten password page view : check the user new password
 * and send it to the Back-end with a token to validate the change
 * 
 * @param {object} history 
 * @author Cecile
 */
const PasswordResetEndView = ({ history }) => {

    const [errorLog, setErrorLog] = useState(false)
    const [loading, setLoading] = useState(true);
    const { key } = useParams();


    useEffect(() => {

        resetPasswordCheckTokenValidity(key)
            .then(response => {
                if (response.status === 200)
                    setLoading(false);
            })
            .catch((error, response) => {
                history.push(URL_HOME);
            })
    })


    const handleSetNewPassword = (values) => {
        let passwordReset = {
            key: key,
            newPassword: values.newPassword,
            verifyPassword: values.verifyNewPassword
        }

        resetPasswordEnd(passwordReset).then(response => {
            if (response.status === 200) {
                toast.success("Mot de passe réinitialisé")
                history.push(URL_HOME)
            }
        }).catch(() => setErrorLog(true))
    }

    return (
        <>
            {loading ? < Loader /> :

                <div className=''>
                    <div className="md:flex md:justify-center">
                        <PasswordResetForm submit={handleSetNewPassword} errorLog={errorLog} />
                    </div>
                </div>

            }
        </>
    );

};

export default PasswordResetEndView