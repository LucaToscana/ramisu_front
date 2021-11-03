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
        <div className="m-4 flex flex-col-6 flex-wrap">
            <img src={figurine} alt="" className="w-full border-2 border-gray-500 " />
            <div className="productCard p-2 w-full flex flex-col flex-wrap justify-center items-center">
                <div>
                    <h2 className="m-2 flex text-center">{label}</h2>
                </div>
                <div className="w-full flex justify-around">
                    <img src={heart} alt="" className="w-7" />
                    <p className="m-2">{price}€</p>
                    <img src={cart} alt="" className="w-7" />
                </div>
            </div>
        </div>
    )
}

export const ProductList = ({ label, price }) => {
    return (
        <div className="flex m-4 clip-path">
            <img src={figurine} alt="" className="w-1/3 border-2 border-gray-500 " />
            <div className="productCard p-2 w-full flex flex-column justify-evenly">
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