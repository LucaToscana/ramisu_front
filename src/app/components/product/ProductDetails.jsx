import React from "react";
import { CheckIcon, XIcon, ShoppingCartIcon, RefreshIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from "react-redux";
import { add, selectCart, setQuantity } from '../../shared/redux-store/cartSlice';
import { useState } from "react";

/**
 * Component product to show details
 * @param label
 * @param price
 * @param description
 * @returns show details product

 */
const ProductDetails = ({ label, price, description, picture, stock, id, cart, cartQuantity }) => {
    const [quantity, setQuantityNew] = useState(0)
    const product = { "id": id, "label": label, "price": price, "stock": stock, "quantite": quantity, "picture": picture }
    const dispatch = useDispatch();
    const carts = useSelector(selectCart)
    //var getQuantity = () => { if (cartQuantity !== undefined) { return cartQuantity } else { return "0" } }
    const [errorQty, setErrorQty] = useState("")

    const handleReset = () => {


        var reset = carts.find(x => x.id === id)
        document.getElementById("myNumberInput").value = reset.quantite
        setErrorQty('')

    };

    const handleChange = event => {
        let { value, min, max } = event;



        document.getElementById("myNumberInput").value = parseInt(value, 10);
        if (value === "") { document.getElementById("myNumberInput").value = 0 }

        if (+value >= +min && +value <= +max) {
            setQuantityNew(parseInt(value, 10))
            setErrorQty('')

        }
        else if (value < 0) {
            setErrorQty('  La quantité doit être supérieure à 0')
        }
        else {


            setErrorQty('Quantité non disponible en stock(' + stock + "max)")
        }
    };

    return (
        <>
            <div className="sm:m-10 md:mt-10 lg:mt-20">


                <div className="border-t-2 border-gray-400 max-w-screen-xl flex flex-col lg:flex lg:flex-row">
                    <div className="lg:w-1/2">
                        <img
                            className="mt-10 mb-4 border-2 border-gray-400"
                            src={picture}
                            alt=""
                        />
                    </div>
                    <div className="lg:w-1/2 ml-10 ">
                        <div>
                            <h1 className="font-bold text-3xl mt-10">{label}</h1>
                            <h2 className="font-bold text-2xl mt-10">Prix: {price} € H.T.</h2>
                            <p className="text-xl mt-10 pb-10 border-b-2 border-gray-400">{description}</p>
                        </div>
                        <div>
                            <p className='font-bold flex items-center text-2xl mt-10'>En Stock({stock}) {stock > 0 ? <CheckIcon className='ml-2 w-6 h-6 iconTrue' /> : <XIcon className='ml-2 w-6 h-6 iconNone' />}</p>
                        </div>


                        <div>



                            <div className="grid grid-cols-6 p-2">

                                <div className="pt-3 "><RefreshIcon className="h-5 w-5" onClick={() => handleReset()}></RefreshIcon></div>

                                <div className="p-1"><input type="number"
                                    id="myNumberInput"
                                    min={0} max={100}
                                    defaultValue={cart !== null ? cartQuantity : quantity}
                                    className="w-14 mr-1 md:w-20"
                                    onChange={(event) => handleChange(event.target)}
                                />


                                </div>




                                <div className="col-start-4 col-span-4">
                                    <div className="inline-flex rounded-xl items-center  content-center  login text-sm" onClick={() => dispatch(setQuantity([product, quantity]))}>
                                        modifier  le panier<ShoppingCartIcon className="w-8 h-8" />
                                    </div>
                                </div>
                            </div>



                        </div>
                        {errorQty}


                    </div>

                </div>
            </div>
        </>
    );
};

export default ProductDetails;