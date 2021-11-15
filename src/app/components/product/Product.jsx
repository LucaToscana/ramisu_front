import figurine from '../../assets/images/figurine.jpg'
import heart from '../../assets/images/icones/heart-regular.svg'
// import heartSolid from '../../assets/images/icones/heart-solid.svg'
import cart from '../../assets/images/icones/shopping-cart-solid.svg'
import React from 'react'
/**
 * Creation of a component Product.jsx to display the products
 * 
 * @author Jeremy Dejonghe
 */
export const Product = ({ label, price }) => {
    return (
        <div className="m-4 p-4 Cardproduct ">
            <div className="flex flex-wrap">
                <img src={figurine} alt="" className="w-full" />
                <div className="mt-4 p-2 flex flex-column justify-center w-100 clip-path productCard">
                    <div>
                        <h2 className="m-2 text-center font-bold">{label}</h2>
                    </div>
                    <div className="flex justify-evenly items-center w-100 mb-2">
                        <div className="price justify-start rounded-2xl p-3">
                            <p className="font-bold text-white">{price} € H.T</p>
                        </div>
                        <div className="flex">
                            <div className="login rounded-2xl m-1 p-3">
                                <img src={heart} alt="add to favorite" className="w-7" />
                            </div>
                            <div className="login rounded-2xl m-1 p-3">
                                <img src={cart} alt="add to cart" className="w-7" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ProductList = ({ label, price }) => {
    return (
        <div className="flex m-4 p-4 shadow-inner Cardproduct">
            <div className="flex">
                <img src={figurine} alt="" className="w-1/3 mr-1" />
                <div className="p-2 flex flex-column justify-evenly w-100 clip-path productCard">
                    <div>
                        <h2 className="m-2 text-center font-bold">{label}</h2>
                    </div>
                    <div className="price align-self-center rounded-2xl p-2">
                        <p className="font-bold text-white">{price} € H.T</p>
                    </div>
                    <div className="flex justify-around items-center w-100 mb-2">
                        <div className="login rounded-2xl m-1">
                            <img src={heart} alt="add to favorite" className="w-5" />
                        </div>
                        <div className="login rounded-2xl m-1">
                            <img src={cart} alt="add to cart" className="w-5" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}