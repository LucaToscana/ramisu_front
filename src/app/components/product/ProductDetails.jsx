import React from "react";
import { CheckIcon, XIcon, ShoppingCartIcon } from '@heroicons/react/solid';
import { useDispatch } from "react-redux";
import { add } from '../../shared/redux-store/cartSlice';

/**
 * Component product to show details
 * @param label
 * @param price
 * @param description
 * @returns show details product

 */
const ProductDetails = ({ label, price, description, picture, stock, id }) => {

    const product = { "id": id, "label": label, "price": price, "stock": stock, "quantite": 1, "picture": picture }
    const dispatch = useDispatch();

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
                            <p className='font-bold flex items-center text-2xl mt-10'>En Stock {stock > 0 ? <CheckIcon className='ml-2 w-6 h-6 iconTrue' /> : <XIcon className='ml-2 w-6 h-6 iconNone' />}</p>
                        </div>
                        <div className="inline-flex rounded-xl items-center justify-end content-center mt-10 login hover:cursor-pointer" onClick={() => dispatch(add(product))}>
                            Ajoutez au panier <ShoppingCartIcon className="w-8 h-8" />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ProductDetails;