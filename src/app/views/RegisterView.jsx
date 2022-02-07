import React, { useRef, useState } from 'react'
import { register } from '../api/backend/account';
import { URL_LOGIN } from '../shared/constants/urls/urlConstants';
import Register from '../components/account/Register';
import ReCAPTCHA from 'react-google-recaptcha'
import axios from 'axios';
import ModalSuccessRegister from '../shared/components/utils-components/Modal/ModalSuccessRegister';
import useModal from '../shared/components/utils-components/Modal/useModal';



/**
 * View/Page Login
 * 
 * @param {object} history 
 * @author Luca Toscana
 */
const RegisterView = ({ history }) => {

    const [errorLog, setErrorLog] = useState(false)
    const recaptchaRef = useRef(null)
    const recaptcha = import.meta.env.VITE_REACT_RECAPTCHA
    const { isShowing: isFormShowed, toggle: toggleForm } = useModal();
    const exit = () => {
        toggleForm
        history.push(URL_LOGIN)
    }
    const handleInscription = async (values) => {

        const captchaToken = await recaptchaRef.current.executeAsync();

        const stringCapatcha = captchaToken + ""

        const registration = {
            firstName: values.firstName,
            lastName: values.lastName,
            birthdate: values.birthdate,
            mail: values.mail,
            adresse: values.adresse,
            number: values.number,
            street: values.street,
            additionalAddress: values.additionalAddress,
            postalCode: values.postalCode,
            city: values.city,
            country: values.country,
            phone: values.phone,
            password: values.password,
            passwordTest: values.passwordTest,
            captchaToken: stringCapatcha
        }
        recaptchaRef.current.reset();
        register(registration).then(res => {
            if (res.status === 200 && res.data !== 0) {
                toggleForm()


            }
        }).catch(() => setErrorLog(true))
    }

    return (

        <div className="md:flex md:justify-center">
            <ReCAPTCHA
                sitekey={recaptcha}
                ref={recaptchaRef}
                size="invisible"


            />

            <Register submit={handleInscription} errorLog={errorLog} />
            <ModalSuccessRegister
                isShowing={isFormShowed}
                hide={exit}
            ></ModalSuccessRegister>

        </div>

    );
};

export default RegisterView