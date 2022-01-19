import React from 'react';
import { init, remove, setQuantity, selectCart } from "../shared/redux-store/cartSlice";
import { useSelector } from "react-redux";
import trash from "../assets/images/icones/trash.png";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addOrder } from "../api/backend/order";
import { isAuthenticated } from '../shared/services/accountServices';
import { URL_LOGIN } from '../shared/constants/urls/urlConstants'
import { CheckIcon, ShoppingCartIcon, XIcon } from '@heroicons/react/solid';

const CartsView = () => {
    const carts = useSelector(selectCart)
    const history = useHistory();
    const dispatch = useDispatch();
    let subTotal = 0;
    for (let i = 0; i < carts.length; i++) {
        subTotal += carts[i].quantite * carts[i].price
    }

    function addDays(days) {
        let result = new Date()
        result.setDate(result.getDate() + days);
        return result.toLocaleDateString();
    }

    function validate(carts) {
        if (isAuthenticated()) {
            addOrder(carts.filter(c => !(c.quantite === ""))).then(res => {
                if (res.data)
                    dispatch(init())
            }
            )
        } else {
            history.push(URL_LOGIN)
        }
    }

    return (
        <div className='flex justify-around m-5'>
            <div className=''>
                <div className='flex border-b-2 border-gray-400 pb-4'>
                    <ShoppingCartIcon className='w-10 h-10' />
                    <h1 className='flex items-end font-bold text-2xl ml-4'>Panier</h1>
                </div>

                {/* <h1 className="mb-3 text-4xl text-center">{(carts.length === 0) ? "aucun article" : "Nombre d'article : " + carts.length}</h1> */}

                {carts.map(cart =>
                    <div key={cart.id} className="flex cartCard mt-4 p-4 w-full">
                        <div className="pr-5">
                            <img src={cart.picture} alt="" className="w-40"
                                onClick={() => history.push(`/produits/detail/${cart.id}`)} />
                        </div>
                        <div className="w-full flex flex-col place-content-evenly">
                            <h2 className="font-semibold">{cart.label}</h2>
                            <div className="flex items-center pb-2">
                                <div className='w-1/2'>
                                    <p className="font-bold">{cart.price} € H.T.</p>
                                </div>
                                <div>
                                    <input type="number"
                                        value={cart.quantite}
                                        className="w-14 mr-5 md:w-20"
                                        onChange={(e) => dispatch(setQuantity([cart, e.target.value]))} />
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='w-1/2'>
                                    <p className='font-bold flex items-center'>En Stock {cart.stock > 0 ? <CheckIcon className='ml-2 w-6 h-6 iconTrue' /> : <XIcon className='ml-2 w-6 h-6 iconNone' />}</p>
                                </div>
                                <div>
                                    <img src={trash} alt="" className="w-10" onClick={() => dispatch(remove(cart))} />
                                </div>
                            </div>
                        </div>

                    </div>
                )}
                {(carts.length !== 0) &&
                    <div>
                        <div className='p-8'>
                            <h1 className="text-lg font-semibold mt-2 mb-3 text-center">Date de livraison estimée au:</h1>
                            <p className="text-center text-2xl">{addDays(5)}</p>
                        </div>
                        <div className=''>
                            <table className="pt-8 pb-8 flex justify-end border-t-2 border-b-2 border-gray-400 ">
                                <tbody>
                                    <tr>
                                        <td className="text-right pr-2 font-bold text-2xl">Sous Totale:</td>
                                        <td className='font-bold text-xl flex justify-end  mt-1'>{subTotal} €</td>
                                    </tr>
                                    <tr>
                                        <td className="text-right pr-2 font-bold text-2xl">TVA:</td>
                                        <td className='font-bold text-xl flex justify-end  mt-1'>{subTotal * 0.2} €</td>
                                    </tr>
                                    <tr>
                                        <td className="text-right pr-2 font-bold text-2xl">Totale:</td>
                                        <td className='font-bold text-xl flex justify-end mt-1'>{subTotal * 1.2} €</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='flex justify-end'>
                               <button className="clearCart mt-2 mr-2" onClick={() => dispatch(init())}>Vider</button>
                                <button className="validateCart mt-2" onClick={() =>history.push('/paiement') /*validate(carts)*/}>Payer</button>
                            </div> 
                        </div>
                    </div>
                }


            </div>
        </div>
    );
};

export default CartsView;