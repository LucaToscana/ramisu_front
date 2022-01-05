import React from 'react';
import { useDispatch } from "react-redux";
import { add } from '../../../shared/redux-store/cartSlice';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/outline';


/**
 * Creation of a component Product.jsx to display the products
 * 
 * @author Jeremy Dejonghe
 */
export const Product = ({ label, price, stock, id, picture }) => {
    const product = { "id": id, "label": label, "price": price, "stock": stock, "quantite": 1, "picture": picture }
    const dispatch = useDispatch()

    return (
        <div className="m-4 p-4 Cardproduct ">
            <div className="flex flex-wrap">
                <img src={picture} alt="" className="w-full" onClick={() => dispatch(add(product))} />
                <div className="mt-4 p-2 flex flex-col justify-center w-full clip-path productCard">
                    <div>
                        <h2 className="m-2 text-center font-bold truncate">{label}</h2>
                    </div>
                    <div className="flex justify-evenly items-center w-100 mb-2">
                        <div className="price justify-start rounded-2xl p-3">
                            <p className="font-bold text-white">{price} €</p>
                        </div>
                        <div className="flex">
                            <div className="login rounded-2xl m-1 p-3">
                                <HeartIcon
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <div className="login rounded-2xl m-1 p-3">
                                <ShoppingCartIcon
                                    width={32}
                                    height={32}
                                    onClick={() => dispatch(add(product))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ProductList = ({ label, price, stock, id, picture }) => {
    const product = { "id": id, "label": label, "price": price, "stock": stock, "quantite": 1, "picture": picture }
    const dispatch = useDispatch()
    return (
        <div className="flex m-4 p-4 shadow-inner Cardproduct">
            <div className="flex w-full">
                <img src={picture} alt="" className="w-20 mr-1" />
                <div className="flex flex-col p-2 justify-evenly clip-path productCard w-full overflow-hidden">
                    <div className='w-4/5'>
                        <h2 className="m-2 text-center font-bold truncate">{label}</h2>
                    </div>
                    <div className="flex justify-evenly items-center mb-2">
                        <div className="price justify-start rounded-2xl p-3">
                            <p className="font-bold text-white">{price} €</p>
                        </div>
                        <div className="flex">
                            <div className="login rounded-2xl m-1 p-3">
                                <HeartIcon
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <div className="login rounded-2xl m-1 p-3">
                                <ShoppingCartIcon
                                    width={32}
                                    height={32}
                                    onClick={() => dispatch(add(product))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}