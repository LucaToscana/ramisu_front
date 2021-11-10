import figurine from '../../assets/images/figurine.jpg'
import heart from '../../assets/images/icones/heart-regular.svg'
// import heartSolid from '../../assets/images/icones/heart-solid.svg'
import cart from '../../assets/images/icones/shopping-cart-solid.svg'
import React from 'react'
import {useDispatch} from "react-redux";
import { add } from "../../shared/redux-store/cartSlice";

/**
 * Creation of a component Product.jsx to display the products
 * 
 * @author Jeremy Dejonghe
 */
export const Product = ({ label, price,stock, id }) => {
    const product = {"id":id, "label":label, "price":price,"stock":stock,"quantite":1}
    const dispatch = useDispatch()
    return (
        <div className="m-4 flex flex-col-6 flex-wrap shadow-inner">
            <img src={figurine} alt="" className="w-full border-2 border-gray-500 " />
            <div className="productCard p-2 w-full flex flex-col flex-wrap justify-center items-center shadow-lg">
                <div>
                    <h2 className="m-2 flex text-center">{label}</h2>
                </div>
                <div className="w-full flex justify-around">
                    <img src={heart} alt="" className="w-7" />
                    <p className="m-2">{price}€</p>
                    <img src={cart} alt="" className="w-7" onClick={() => dispatch(add(product))}/>
                </div>
            </div>
        </div>
    )
}

export const ProductList = ({ label, price }) => {
    return (
        <div className="flex m-4 clip-path shadow-inner">
            <img src={figurine} alt="" className="w-1/3 border-2 border-gray-500 " />
            <div className="productCard p-2 w-full flex flex-column justify-evenly shadow-lg">
                <div>
                    <h2 className="m-2 text-center">{label}</h2>
                </div>
                <div className="flex justify-evenly">
                    <img src={heart} alt="" className="w-7" />
                    <p className="m-2">{price}€</p>
                    <img src={cart} alt="" className="w-7" />
                </div>
            </div>
        </div>
    )
}