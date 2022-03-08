import React, { useEffect, useRef, useState } from 'react'
import { register } from '../api/backend/account';
import { URL_LOGIN } from '../shared/constants/urls/urlConstants';
import Register from '../components/account/Register';
import ReCAPTCHA from 'react-google-recaptcha'
import { Formik, Form, Field } from 'formik';
import DatePickerField from '../shared/components/form-and-error-components/DatePickerField';
import "react-datepicker/dist/react-datepicker.css";

import { CustomInput } from '../shared/components/form-and-error-components/InputCustom';
import AddressInput from '../shared/components/form-and-error-components/AddressInput';

import logo from "../assets/images/icones/logo/warhammer-shop-logo.png";

/**
 * View/Page Login
 * 
 * @param {object} history 
 * @author Luca Toscana
 */
const RegisterView = ({ history }) => {

    const recaptchaRef = useRef(null)
    const recaptcha = import.meta.env.VITE_REACT_RECAPTCHA
   
    const [success, setSuccess] = useState(false);
    const [errorMsg , setErrorMessage] = useState();
    const [delay , setDelay] = useState(-1);
    
    
    
    let time = null;
    useEffect(()=>{
       if(delay>=0) time = setTimeout(()=>
       {
           setDelay(delay-1);
           if(delay==0)
           {
               clearInterval(time);
               history.push(URL_LOGIN);
           }
       } , 1000);
    },[delay]);


    const handleInscription = async (values) => {

        const captchaToken = await recaptchaRef.current.executeAsync();
        const registration = Object.assign({}, values, { captchaToken: captchaToken});
        
        register(registration).then(res => {
            recaptchaRef.current.reset();
            if (res.status === 200 && res.data !== 0) {
                if(res.data>0){
                    setSuccess(true);  
                    setDelay(3);
                }
            }else setErrorMessage("L'Email existe deja dans la base de données");
             
        }).catch((error) => {
            console.log(error)
        }).finally(()=> { recaptchaRef.current.reset(); });;
      
    }

    return (

        <div className="md:flex md:justify-center pb-8">

            <ReCAPTCHA sitekey={recaptcha} ref={recaptchaRef} size="invisible" />

            { !success&& (<Register submit={handleInscription} errorMsg={errorMsg}  />)}

            { success && (
                <div className="mt-16 flex flex-col justify-center">
                    <p className="font-extrabold text-2xl text-center	">
                        Inscription effectué avec succès !<br/>
                        Vous serez redirigé vers la page de connexion
                    </p>
                    <p className="mt-3 text-xl text-center italic">
                        {delay} seconde{delay>1?'s' : ''}
                    </p>
                </div>)}


        </div>

    );
};

export default RegisterView
