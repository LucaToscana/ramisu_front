import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { selectCart } from "../shared/redux-store/cartSlice";

import { CheckIcon } from '@heroicons/react/solid';
import { loadStripe } from "@stripe/stripe-js";

import ButtonStripe from '../shared/components/buttons/ButtonStripe';
import paypal from "../assets/images/paypal.png";
import visaMaster from "../assets/images/visaMastercard.png";
import { ButtonBack } from '../shared/components/buttons/ButtonBack';
import useModal from '../shared/components/utils-components/Modal/useModal';
import ModalPayCBWarahmmerMarket from '../shared/components/utils-components/Modal/modalCB/ModalPayCBWarahmmerMarket';
import axios from 'axios';


const PaiementPayerView = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_REACT_STRIPE_API_KEY);
    const { isShowing: isFormShowed, toggle: toggle } = useModal();
    const [remember, setRemember] = useState(false)
const [errorPay,setErrorPay]=useState("")
    const carts = useSelector(selectCart)


    let subTotal = 0;
    for (let i = 0; i < carts.length; i++) {
        subTotal += carts[i].quantite * carts[i].price
    }

    const totalToPay = () => {
        if ((subTotal * 1.2) < 25) { return ((subTotal * 1.2) + 10).toFixed(2) } else {
            return (subTotal * 1.2).toFixed(2)
        }
    }
    const handleTokenSavePayement = (token) => {
        console.log(token);
        axios.post("http://localhost:8080/api/payment/new-customer", "", {
            headers: {
                token: token.id,
                mail: accountLogin(),

            },
        })
            .then((res) => {

                return res
            })
            .catch((error) => {
                alert(error);
            });
    }

    const handleSubmit = (values) => {
        const a = JSON.parse(values)
        a.amount = totalToPay()
        if (!remember) {
            axios.post("http://localhost:8080/api/payment/one-times-pay", a
            )
            .then((res) => {

                alert(res.data+"one-times-pay")
                setErrorPay(res.data)
            })
            .catch((error) => {
                alert(error);
            });
        } else {

            axios.post("http://localhost:8080/api/payment/new-customer-and-pay", a
            )
            .then((res) => {

                alert(res.data+"new-customer-and-pay")
            })
            .catch((error) => {
                alert(error);
            });



        }

    }


    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 cursor-default m-5 p-5 flex justify-around m-5'>
            {remember + "ddddddddddddddddddddd"}
            <ModalPayCBWarahmmerMarket
                isShowing={isFormShowed}
                hide={
                    toggle}
                title="payer par CB"
                tot={totalToPay()}
                stripePromise={stripePromise}
                submit={handleSubmit}
                remember={() => setRemember(!remember)}
                isRemember={remember}
                errorPay={errorPay}

            >
            </ModalPayCBWarahmmerMarket>

            <div className='lg:w-2/3'>
                <div className='flex border-b-2 border-gray-400 pb-4 mb-5'>
                    <h1 className='flex  font-bold text-4xl ml-4'>Paiement</h1>
                </div>

                <div className='flex border-b-2 border-gray-400 pb-4'>
                    <h1 className='flex font-bold text-2xl ml-4'>Paiement par paypal</h1>
                </div>
                <div className='flex justify-between  border-b-2 border-gray-400 mt-5   cartCard '>
                    <div className='self-center h-full'>  <img src={paypal} height={200} width={200}></img>  </div>    <p className="text-sm mt-10 pb-10 self-center">
                        Vous pouvez valider le paiement avec paypal
                    </p>

                    <div className='flex justify-end self-end m-2 text-sm	'>
                        <button className="paiementCart h-12 w-24" onClick={() => alert("button paypal")/*validate(carts)*/}>Paypal</button>
                    </div>
                </div>



                <div className='flex border-b-2 border-gray-400 pb-4 mt-5 '>
                    <h1 className='flex items-end font-bold text-2xl ml-4'>Paiement par carte </h1>
                </div>
                <div className='flex justify-between  border-b-2 border-gray-400 mt-5   cartCard '>
                    <div className='self-center h-full m-4 '>  <img src={visaMaster} height={130} width={130}></img>  </div>    <p className="text-sm mt-10 pb-10 self-center">
                        Vous pouvez valider le paiement avec Visa or Mastercard
                    </p>





                    <div className='flex justify-end self-end m-2 text-sm	'>

                        {<div className='flex justify-center m-3 w-full'>
                            <div className='flex justify-end self-end m-2 text-sm w-full	'>
                                <button className="validateCart h-24 " onClick={toggle}>Pay {(subTotal * 1.2) < 25 ? ((subTotal * 1.2) + 10).toFixed(2)
                                    : (subTotal * 1.2).toFixed(2)}€</button>
                            </div>
                            <ButtonStripe amountO={(subTotal * 1.2) < 25 ? ((subTotal * 1.2) + 10).toFixed(2)
                                : (subTotal * 1.2).toFixed(2)}></ButtonStripe>                    </div>

                        }

                    </div>

                </div>



                <div className='flex border-b-2 border-gray-400 pb-4 mt-5 '>
                    <h1 className='flex items-end font-bold text-2xl ml-4'>
                        Récapitulatif d’achat</h1>
                </div>


                <div className='flex  border-b-2 border-gray-400   cartCard '>

                    <div class="grid grid-cols-4 gap-2 w-full p-3 	">
                        <div className='w-full'>  <h1 className='font-bold text-1xl '> Article:</h1></div>
                        <div className='w-full text-center'>  <h1 className='font-bold text-1xl '> Prix HT €</h1></div>
                        <div className='w-full text-center'>  <h1 className='font-bold text-1xl '> Prix TTC €</h1></div>

                        <div className='w-full text-center'>  <h1 className=' font-bold text-1xl '> Quantite</h1></div>

                        {carts.map(cart => <>
                            <div className='w-full'><p className='text-sm '> {cart.label}</p></div>
                            <div className='w-full text-center'><p className='text-sm '> {(cart.price * 1).toFixed(2)}</p></div>
                            <div className='w-full text-center'><p className='text-sm '> {(cart.price * 1 * 1.2).toFixed(2)}</p></div>

                            <div className='w-full text-center'><p className='text-sm '> {cart.quantite}</p></div></>)}
                    </div>
                </div>


                <div className='flex border-b-2 border-gray-400 pb-4 mt-5 '>
                    <h1 className='flex items-end font-bold text-2xl ml-4'>
                        Total</h1>
                </div>

                <div className='  border-b-2 border-gray-400   cartCard '>


                    <div class="grid grid-cols-3 gap-2 w-full p-3 	">
                        <div className='w-full'><p className='text-sm '> Sous-total HT </p></div>
                        <div className='w-full text-center'><p className='text-sm '> </p></div>
                        <div className='w-full text-center'><p className='text-sm '> {(subTotal * 1).toFixed(2)}€</p></div>
                    </div>
                    <div class="grid grid-cols-3 gap-2 w-full p-3 	">
                        <div className='w-full'><p className='text-sm '> Tot TVA </p></div>
                        <div className='w-full text-center'><p className='text-sm '> </p></div>
                        <div className='w-full text-center'><p className='text-sm '> {(subTotal * 0.2).toFixed(2)}€</p></div>
                    </div>
                    <div class="grid grid-cols-3 gap-2 w-full p-3 	">
                        <div className='w-full'><p className='text-sm '> Livraison</p></div>
                        <div className='w-full text-center'><p className='text-sm '> </p></div>
                        {(subTotal * 1.2) < 25 ? <div className='w-full text-center'><p className='text-sm '> 10 €</p></div>
                            : <div className='w-full text-center'><p className='text-sm '> gratuit</p></div>}
                    </div>
                    <div className='flex border-b-2 border-gray-400 p-4 mr-5 ml-5 mt-1 mb-1'>
                        <h1 className='flex items-end font-bold text-4xl '></h1>
                    </div>
                    <div class="grid grid-cols-3 gap-2 w-full p-3 	">
                        <div className='w-full'><h1 className='flex items-end font-bold text-1xl'>
                            Total (TVA incluse)</h1></div>
                        <div className='w-full text-center'><p className='text-sm font-bold  '> </p></div>
                        {(subTotal * 1.2) < 25 ? <> <div className='w-full text-center'><p className='text-sm font-bold '> {(subTotal * 1.2) + 10}€</p></div>



                        </> : <div className='w-full text-center'><p className='text-sm font-bold '> {(subTotal * 1.2).toFixed(2)}€</p></div>}                    </div>

                    <div className="lg:w-1/8  flex justify-end self-end p-1 ">
                        {localStorage.getItem('myAddress') !== null ? <> <CheckIcon className='md:w-12 h-12 iconTrue' />
                            <p className='text-xs p-5'>A domicile:
                                {JSON.parse(localStorage.getItem('myAddress')).number + "   "
                                    + JSON.parse(localStorage.getItem('myAddress')).street + "   "
                                    + JSON.parse(localStorage.getItem('myAddress')).city + "   " + JSON.parse(localStorage.getItem('myAddress')).postalCode + "  "
                                    + JSON.parse(localStorage.getItem('myAddress')).country + JSON.parse(localStorage.getItem('myAddress')).additionalAddress}

                            </p>
                        </> : null}  </div>

                    <div className='p-5'>  <ButtonBack ></ButtonBack></div></div>

            </div>



            <div></div>
        </div>
    );
};

export default PaiementPayerView;