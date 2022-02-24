import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { init, selectCart } from "../shared/redux-store/cartSlice";
import { CheckIcon } from '@heroicons/react/solid';
import paypal from "../assets/images/paypal.png";
import visaMaster from "../assets/images/visaMastercard.png";
import { ButtonBack } from '../shared/components/buttons/ButtonBack';
import useModal from '../shared/components/utils-components/Modal/useModal';
import ModalPayCBWarahmmerMarket from '../shared/components/utils-components/Modal/modalCB/ModalPayCBWarahmmerMarket';
import ModalSuccessPay from '../shared/components/utils-components/Modal/ModalSuccessPay';
import { isAuthenticated } from '../shared/services/accountServices';
import { addOrderWithAddress, newCustomerAndPay, payOneTimes } from '../api/backend/order';
import { useHistory } from 'react-router-dom';


const PaiementPayerView = () => {
    const { isShowing: isFormShowed, toggle: toggle } = useModal();
    const { isShowing: isSuccessFormShowed, toggle: toggleSuccessForm } = useModal();
    const [remember, setRemember] = useState(false)
    const [errorPay, setErrorPay] = useState("")
    const carts = useSelector(selectCart)
    const idaddress = localStorage.getItem("idAddress",)
    const dispatch = useDispatch();
    const history = useHistory()

    let subTotal = 0;
    for (let i = 0; i < carts.length; i++) {
        subTotal += carts[i].quantite * carts[i].price
    }

    const totalToPay = () => {
        if ((subTotal * 1.2) < 25) { return ((subTotal * 1.2) + 10).toFixed(2) } else {
            return (subTotal * 1.2).toFixed(2)
        }
    }


    useEffect(() => {
        if (performance.navigation.type === 1) {

            var test = localStorage.getItem("successPaiement")
            if (test === "true") {
                localStorage.removeItem('totPayer')
                dispatch(init())
                localStorage.removeItem('myAddress')
                localStorage.removeItem('idAddress')
                localStorage.removeItem('totPayer')

                history.push("/")
            }

            console.log("This page is reloaded");
        } else {
            console.log("This page is not reloaded");
        }
    }, []);

    const closeSuccess = () => setTimeout(function () { deleteAndRefresh() }, 6000);

    const hideSuccess = () => {

        history.push('/')
        dispatch(init())
        toggleSuccessForm()
        localStorage.removeItem('myAddress')
        localStorage.removeItem('idAddress')
        localStorage.removeItem('totPayer')

    }
    const hideClear = () => {


        toggle()
        setErrorPay('')
        setRemember(false)
    }


    const deleteAndRefresh = () => {
        dispatch(init())
        localStorage.removeItem('totPayer')
        history.push('/')
    }
  

 

    const handleSubmit = (values) => {
        values.amount = totalToPay()
        if (!remember) {
            payOneTimes(values)
                .then((res) => {
                    setErrorPay(res.data)
                    finishOrder(res.data)

                })
                .catch((error) => {
                });
        } else {

            newCustomerAndPay(values)
                .then((res) => {
                    setErrorPay(res.data)
                    finishOrder(res.data)
                })
                .catch((error) => {
                });



        }

    }


    function finishOrder(test) {
        if (test === "succeeded") {
            localStorage.setItem('totPayer', totalToPay())
            validate(carts)
            toggle()
            setTimeout(function () { toggleSuccessForm() }, 1000);
            closeSuccess()
        }
    }

    const validate = (carts) => {
        if (isAuthenticated()) {
            const addressLocalStorage = JSON.parse(localStorage.getItem("myAddress"))
            const isMain = addressLocalStorage.isMain;

            const address = {

                id: idaddress,
                number: addressLocalStorage.number,
                street: addressLocalStorage.street,
                additionalAddress: addressLocalStorage.additionalAddress,
                postalCode: addressLocalStorage.postalCode,
                city: addressLocalStorage.city,
                country: addressLocalStorage.country,

            }

            addOrderWithAddress(carts.filter(c => !(c.quantite === "")), address, "domicile", isMain).then(res => {
                if (res.data) {
                    localStorage.setItem("successPaiement", true)

                }
            }
            )
        } else {
            history.push(URL_LOGIN)
        }
    }
    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 cursor-default m-5 p-5 flex justify-around m-5'>

            <ModalPayCBWarahmmerMarket
                isShowing={isFormShowed}
                hide={() =>
                    hideClear()}
                title="payer par CB"
                tot={totalToPay()}
                submit={handleSubmit}
                remember={() => {
                    setRemember(!remember)
                    if (remember) { setErrorPay('') }
                }}
                isRemember={remember}
                errorPay={errorPay}

            >
            </ModalPayCBWarahmmerMarket>
            <ModalSuccessPay
                isShowing={isSuccessFormShowed}
                hide={hideSuccess}
                title="SUCCESS"
            >
            </ModalSuccessPay>

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

                        </div>

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