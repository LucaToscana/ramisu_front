import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { resetPasswordStart } from '../api/backend/account';
import PasswordForgottenForm from '../components/account/PasswordForgottenForm';

/**
 * Forgotten password page view : start the password recovering feature
 * 
 * @param {object} history 
 * @author Cecile
 */
const PasswordResetStartView = ({ history }) => {

    const [errorLog, setErrorLog] = useState(false)

    const handleAskEmailAddress = (values) => {
    
        resetPasswordStart(values).then(response => {
            if (response.status === 200) {
                toast.success("Un email a été envoyé à l'adresse indiquée.")
            }
        }).catch(() => setErrorLog(true))
    }

    return (
        <div className=''>
            <div className="md:flex md:justify-center">
                <PasswordForgottenForm submit={handleAskEmailAddress} errorLog={errorLog} />
            </div>
        </div>

    );
};

export default PasswordResetStartView