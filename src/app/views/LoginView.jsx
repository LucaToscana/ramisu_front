import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { signIn } from '../shared/redux-store/authenticationSlice';
import { authenticate } from './../api/backend/account';
import { URL_HOME, URL_PAIEMENT } from './../shared/constants/urls/urlConstants';
import { isAuthenticated } from './../shared/services/accountServices';
import Login from './../components/account/Login';
import ReCAPTCHA from 'react-google-recaptcha';

/**
 * View/Page Login
 * 
 * @param {object} history 
 * @author Peter Mollet
 */
const LoginView = ({ history }) => {

    const recaptchaRef = useRef(null)
    const recaptcha = import.meta.env.VITE_REACT_RECAPTCHA
    const [errorLog, setErrorLog] = useState(false)

    const [message, setMessage] = useState(null);
    const dispatch = useDispatch()



    const handleLogin = async(values) => {
        setMessage(null);
 
            await recaptchaRef.current.executeAsync().then(token=>{
                authenticate(values).then(res => {
                    
                    debugger
                    if (res.status === 200 && res.data.token) {
                        dispatch(signIn(res.data.token))
                        
        
                        if (isAuthenticated) {
        
                            if (localStorage.getItem("testLoginPanier") !== null) {
                                history.push(URL_PAIEMENT)
                                localStorage.removeItem("testLoginPanier");
                            }
                            else {
                                history.push(URL_HOME)
                            }
        
                        }
                    }else{
                        setErrorLog(true)
              
                        if(res.data.errorMessage)
                        {
                            setErrorLog(false);
                            setMessage(res.data.errorMessage)
                        }
                    
                    }
                }) .catch((error) =>{ 
                    setErrorLog(true);
                    // debugger
                  })
            })
            recaptchaRef.current.reset();
            }
        

    return (
        <div className=''>
            <div className="md:flex md:justify-center">
                <ReCAPTCHA
                            sitekey={recaptcha}
                            ref={recaptchaRef}
                            size="invisible" />
                <Login 
                            submit={handleLogin} 
                            errorLog={errorLog} 
                            msg={message} />
            </div>
        </div>

    );
};

export default LoginView