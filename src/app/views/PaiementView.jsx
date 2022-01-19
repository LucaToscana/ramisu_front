import React from 'react';
import { useSelector } from "react-redux";
import { selectCart } from "../shared/redux-store/cartSlice";
import Modal from '../shared/components/utils-components/Modal/ModalExample';
import useModal from '../shared/components/utils-components/Modal/useModal';
import ModalAddress from '../shared/components/utils-components/Modal/modalAddress/ModalAddress';



const PaiementView = () => {
    const { isShowing: isAddressFormShowed, toggle: toggleAddressForm } = useModal();

    const carts = useSelector(selectCart)
    let subTotal = 0;
    for (let i = 0; i < carts.length; i++) {
        subTotal += carts[i].quantite * carts[i].price
    }

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 cursor-default m-5 p-5 flex justify-around m-5'>
      
     

        <ModalAddress
          isShowing={isAddressFormShowed}
          hide={toggleAddressForm}
          title="Indiquer mon adresse"
        >
        </ModalAddress>

            <div className='lg:w-2/3'>
                <div className='flex border-b-2 border-gray-400 pb-4 mb-5'>
                    <h1 className='flex items-end font-bold text-4xl ml-4'>Livraison</h1>
                </div>

                <div className='flex border-b-2 border-gray-400 pb-4'>
                    <h1 className='flex items-end font-bold text-2xl ml-4'>En magasin ( gratuit )</h1>
                </div>
                <div className='flex  border-b-2 border-gray-400 mt-5   cartCard '>
                    <div className="lg:w-full ml-10 ">    <p className="text-sm mt-10 pb-10 border-b-2 ">
                        La livraison est toujours gratuite en magasin Games Workshop ou Warhammer, sans exigence de montant minimum ni de pacte avec les dieux du Chaos.

                    </p></div>
                    <div className="lg:w-1/8  ">   </div>

                    <div className='flex justify-end self-end m-2 text-sm	'>
                        <button className="paiementCart h-12 w-24" onClick={() => alert("Choisir un magasin")/*validate(carts)*/}>Choisir un magasin</button>
                    </div>
                </div>



                <div className='flex border-b-2 border-gray-400 pb-4 mt-5 '>
                    <h1 className='flex items-end font-bold text-2xl ml-4'>A domicile (gratuit a partir de 25 €) </h1>
                </div>
                <div className='flex  border-b-2 border-gray-400   cartCard '>
                    <div className="lg:w-full ml-10 ">    <p className="text-sm mt-10 pb-10 border-b-2 ">
                        Le port Standard coûte 6€ et il est OFFERT pour toute commande de plus de 25€. Tous les frais de port incluent les taxes et frais de douane.

                    </p></div>
                    <div className="lg:w-1/8  ">   </div>

                    <div className='flex justify-end self-end m-2 text-sm	'>
                 
                        <button className="paiementCart h-12 w-24"  onClick={toggleAddressForm}/*validate(carts)*/>Indiquer mon adresse</button>
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
                        {(subTotal * 1.2) < 25 ? <div className='w-full text-center'><p className='text-sm font-bold '> {(subTotal * 1.2) +10}€</p></div>
                            : <div className='w-full text-center'><p className='text-sm font-bold '> {(subTotal * 1.2) }€</p></div>}                    </div>
                
                
                <div className='flex justify-center m-5'>
                                <button className="validateCart mt-2" onClick={() =>history.push('/paiement') /*validate(carts)*/}>Payer</button>
                            </div>
                </div>

              
            </div>


             

            <div></div>
        </div>
    );
};

export default PaiementView;