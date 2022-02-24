
import React, { useState, useRef } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup'
import { contactUs } from '../api/backend/user';
import ReCAPTCHA from 'react-google-recaptcha';
import StripeInput from '../shared/components/stripeInput/StripeInput';
import { allCustomerCards, newCustomer } from '../api/backend/order';
import { useEffect } from 'react';


const PaiementMetodView = () => {
    const [cards, setCards] = useState([])

    const [errorPay, setErrorPay] = useState("")
    const recaptchaRef = useRef(null)
    const recaptcha = import.meta.env.VITE_REACT_RECAPTCHA

    useEffect(() => {
        console.log('stripe')
        allCustomerCards().then((res) => {
            //setErrorPay()
            setCards(res.data.listCards)

        })
            .catch((error) => {
            })
    }, [cards])




    const handleSubmit = async (values) => {

        const captchaToken = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();


        newCustomer(values,/*value.token = captchaToken*/)
            .then((res) => {
                setErrorPay(res.data)

            })
            .catch((error) => {
            })



    }

    return (<div className='bg-white  pb-8'>

        <ReCAPTCHA
            sitekey={recaptcha}
            ref={recaptchaRef}
            size="invisible" />
        <div className='flex flex-wrap'>
            <div className='ml-5 mr-5'> <StripeInput tot={0} submit={handleSubmit} tot={0} errorPay={errorPay} ></StripeInput></div>

            <div>  {cards.map(element => <div>{element.cardStripe} {element.brand}{element.last4}</div>)
        }</div>

        </div>
      

    </div>)

}



export default PaiementMetodView;