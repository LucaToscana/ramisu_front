import React from 'react';
import { init, remove, setQuantity, selectCart } from "../shared/redux-store/cartSlice";
import { useSelector } from "react-redux";
import trash from "../assets/images/icones/trash.png";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import figurine from "../assets/images/figurine.jpg";
import {addOrder} from "../api/backend/order";
import { isAuthenticated } from '../shared/services/accountServices';
import {URL_LOGIN} from '../shared/constants/urls/urlConstants'

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

    function validate(carts){
        if(isAuthenticated()){
            addOrder(carts.filter(c => !(c.quantite === ""))).then(res =>
                {
                    // if(res.data)
                    //     dispatch(init())

                }
            )
        }else{
            history.push(URL_LOGIN)
        }
    }

    return (
        <>
            <h1 className="mb-3 text-4xl text-center">{(carts.length === 0) ? "aucun article" : "Nombre d'article : " + carts.length}</h1>

                {carts.map(cart =>
                    <div key={cart.id} className="flex flex-row pb-2">
                        <div className="pr-5">
                            <img src={figurine} alt="" className="w-20"
                                 onClick={() => history.push(`/produits/detail/${cart.id}`)}/>
                        </div>
                        <div className="flex flex-col">
                            <div className="font-semibold">{cart.label}</div>
                            <div className="text-center pl-1 mb-2 bg-black text-white rounded-full">{cart.price} € H.T</div>
                            <div className="flex flex-row pb-2">
                                <input type="number"
                                       value={cart.quantite}
                                       className="w-14 mr-5 md:w-20"
                                       onChange={(e) => dispatch(setQuantity([cart, e.target.value]))}/>
                                <img src={trash} alt="" className="w-10" onClick={() => dispatch(remove(cart))}/>
                            </div>

                    </div>

                </div>
            )}
            {(carts.length !== 0) &&
                <div>
                    <div>
                        <h1 className="text-lg font-semibold mt-2 mb-3">Date de livraison estimée au:</h1>
                        <p className="text-center">{addDays(5)}</p>
                    </div>

                    <table className="mt-2">
                        <tbody>
                            <tr>
                                <td className="text-right pr-2 font-bold">Sous Totale:</td>
                                <td>{subTotal} €</td>
                            </tr>
                            <tr>
                                <td className="text-right pr-2 font-bold">TVA:</td>
                                <td>{subTotal * 0.2} €</td>
                            </tr>
                            <tr>
                                <td className="text-right pr-2 font-bold">Totale:</td>
                                <td>{subTotal * 1.2} €</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="btn btn-primary mt-2 mr-2" onClick={() => dispatch(init())}>Vider</button>
                    <button className="btn btn-primary mt-2" onClick={() => validate(carts)}>Payer</button>
                </div>
            }


        </>
    );
};

export default CartsView;