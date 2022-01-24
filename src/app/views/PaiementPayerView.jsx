import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { selectCart } from "../shared/redux-store/cartSlice";
import useModal from '../shared/components/utils-components/Modal/useModal';
import ModalAddress from '../shared/components/utils-components/Modal/modalAddress/ModalAddress';
import { setLivraison, selectLivraison } from "../shared/redux-store/livraisonSlice"
import { useDispatch } from 'react-redux';
import { CheckIcon } from '@heroicons/react/solid';

import { useHistory } from 'react-router-dom';
import ButtonStripe from '../shared/components/buttons/ButtonStripe';
import paypal from "../assets/images/paypal.png";
import visaMaster from "../assets/images/visaMastercard.png";
import { useEffect } from 'react';
import { URL_HOME } from '../shared/constants/urls/urlConstants';
import { ButtonBack } from '../shared/components/buttons/ButtonBack';
const PaiementPayerView = () => {
    const [methodPay, selectMethodPay] = useState("")
    const { isShowing: isAddressFormShowed, toggle: toggleAddressForm } = useModal();
    const liv = useSelector(selectLivraison);
    const carts = useSelector(selectCart)

    const history = useHistory();
    /*toggleddressForm*/

    const dispatch = useDispatch();
   

    let subTotal = 0;
    for (let i = 0; i < carts.length; i++) {
        subTotal += carts[i].quantite * carts[i].price
    }
    const submit = (value) => {
        dispatch(setLivraison(value))
        toggleAddressForm()
    }

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 cursor-default m-5 p-5 flex justify-around m-5'>


            <ModalAddress
                isShowing={isAddressFormShowed}
                hide={toggleAddressForm}
                title="Indiquer mon adresse"
                submit={submit}
            >
            </ModalAddress>

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
                        {<div className='flex justify-center m-5'>
                            <ButtonStripe amountO={(subTotal * 1.2) < 25 ? (subTotal * 1.2) + 10
                                : (subTotal * 1.2)}></ButtonStripe>                    </div>

                        }

                    </div>

                </div>



                <div className='flex border-b-2 border-gray-400 pb-4 mt-5 '>
                    <h1 className='flex items-end font-bold text-2xl ml-4'>
                        Récapitulatif d’achat</h1>
                </div>
                <div className='flex  border-b-2 border-gray-400   cartCard '>

                    <div class="grid grid-cols-3 gap-2 w-full p-3 	">
                        <div className='w-full'>  <h1 className='font-bold text-1xl '> Article:</h1></div>
                        <div className='w-full text-center'>  <h1 className='font-bold text-1xl '> prix</h1></div>

                        <div className='w-full text-center'>  <h1 className=' font-bold text-1xl '> quantite</h1></div>

                        {carts.map(cart => <>
                            <div className='w-full'><p className='text-sm '> {cart.label}</p></div>
                            <div className='w-full text-center'><p className='text-sm '> {cart.price}</p></div>

                            <div className='w-full text-center'><p className='text-sm '> {cart.quantite}</p></div></>)}
                    </div>
                </div>


                <div className='flex border-b-2 border-gray-400 pb-4 mt-5 '>
                    <h1 className='flex items-end font-bold text-2xl ml-4'>
                        Total</h1>
                </div>

                <div className='  border-b-2 border-gray-400   cartCard '>


                    <div class="grid grid-cols-3 gap-2 w-full p-3 	">
                        <div className='w-full'><p className='text-sm '> Sous-total</p></div>
                        <div className='w-full text-center'><p className='text-sm '> </p></div>
                        <div className='w-full text-center'><p className='text-sm '> {subTotal * 1.2}</p></div>
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



                        </> : <div className='w-full text-center'><p className='text-sm font-bold '> {(subTotal * 1.2)}€</p></div>}                    </div>

                    <div className="lg:w-1/8  flex justify-end self-end p-1 ">
                        {localStorage.getItem('myAddress') !== null ? <> <CheckIcon className='md:w-12 h-12 iconTrue' />
                            <p className='text-xs p-5'> A domicile:
                                {JSON.parse(localStorage.getItem('myAddress')).numeroA + "   "
                                    + JSON.parse(localStorage.getItem('myAddress')).rue + "   "
                                    + JSON.parse(localStorage.getItem('myAddress')).ville + "   " + JSON.parse(localStorage.getItem('myAddress')).codepostal + "  "
                                    + JSON.parse(localStorage.getItem('myAddress')).pays + JSON.parse(localStorage.getItem('myAddress')).complementadresse}

                            </p>
                        </> : null}  </div>
                        
                        <ButtonBack></ButtonBack></div>

            </div>

           

            <div></div>
        </div>
    );
};

export default PaiementPayerView;