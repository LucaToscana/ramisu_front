
import React, { useState, useRef } from 'react'

import ReCAPTCHA from 'react-google-recaptcha';
import StripeInput from '../shared/components/stripeInput/StripeInput';
import { allCustomerCards, deleteCard, newCustomer } from '../api/backend/order';
import { useEffect } from 'react';
import { CreditCardIcon } from '@heroicons/react/solid';
import CardCreditLines from '../shared/components/stripeInput/CardCreditLines';
import visaMastercard from '../assets/images/visaMastercard.png'
import ModalSuccessPay from '../shared/components/utils-components/Modal/ModalSuccessPay';
import useModal from '../shared/components/utils-components/Modal/useModal';
import ModalDeletCard from '../shared/components/utils-components/Modal/modalCB/ModalDeletCard';

const PaiementMetodView = () => {
    const [deletCart, setDeletCart] = useState("")

    const [cards, setCards] = useState([])
    const [loaded, isLoaded] = useState(false)
    const [errorPay, setErrorPay] = useState("")
    const recaptchaRef = useRef(null)
    const recaptcha = import.meta.env.VITE_REACT_RECAPTCHA
    const { isShowing: isFormShowed, toggle: toggle } = useModal();

    useEffect(() => {
        isLoaded(false)
        console.log('stripe')
        allCustomerCards().then((res) => {
            //setErrorPay()
            setCards(res.data.listCards)
            setTimeout(function () { isLoaded(true) }, 1000);
        })
            .catch((error) => {
            })
    }, [])


    const cardsLimit = () => {
        return cards.length

    }

    const cardsList = () => {
        return cards

    }

    const handleSubmit = async (values) => {

        const captchaToken = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();


        newCustomer(values,/*value.token = captchaToken*/)
            .then((res) => {
                setErrorPay(res.data)
                if (res.status === 200) { window.location.reload() }
            })
            .catch((error) => {
            })



    }

    const deletCardButton = () => {

        deleteCard(deletCart).then((res) => {
            setErrorPay(res.data)
            if (res.status === 200) {





                window.location.reload()




            }
        })
            .catch((error) => {
            })
    }



    if (loaded === false) {
        return <div  style={{ height: 700 }} class="h-full  grid grid-cols-1">
            <div class=" flex justify-center items-center">
                <div class="animate-spin"><CreditCardIcon className="w-24 h-24  " ></CreditCardIcon></div>
            </div>
        </div>
    } else
        return (<div className='bg-white  pb-8 '>
            <h1 className="font-bold text-3xl p-10 text-center">Moyens de paiement</h1>
            <ReCAPTCHA
                sitekey={recaptcha}
                ref={recaptchaRef}
                size="invisible" />
            <div className='flex  flex-wrap items-center justify-center self-center'>
                <div className='m-2 '><div className='grid grid-cols-2 w-80 text-sm'><div><img src={visaMastercard} className='w-1/2 m-4 '></img></div><div> <h1 className="font-bold ">MÉTHODE ACCEPTÉE</h1>
                <p className='text-xs lg:w-48  mt-4'>
                    WarhammerMarket France accepte actuellement  Visa, MasterCard en cas de ventes sur Internet et par téléphone.
                </p></div></div>
                 <div className='m-3 mt-8'>

                        <CardCreditLines cards={cardsList()} size={cards.length} isFormShowed={isFormShowed} deletCard={setDeletCart} toggle={toggle} confirmDelet={deletCardButton} ></CardCreditLines>     </div>    </div>
                <div className='w-0 lg:w-24  '>     </div>
                <div className='p-5 mt-5 '> <StripeInput tot={0} submit={handleSubmit} tot={0} errorPay={cardsLimit()} ></StripeInput></div>
            </div>

        </div>)

}



export default PaiementMetodView;