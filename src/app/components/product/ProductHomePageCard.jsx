import React, { useState } from 'react';
import figurine from './../../assets/images/figurine.jpg';
import { Link, useHistory } from 'react-router-dom';
import { URL_PRODUCTS_DETAILS } from '../../shared/constants/urls/urlConstants';

/**
 * Contains the code to generate a card displaying the informations of a product.
 * 
 * @param {*} param0 
 * @returns a card containing the informations of the product
 * 
 * @author Cecile
 */
const ProductHomePageCard = ({ product, color }) => {

    const history = useHistory();

    return (

        <div class="w-full">
            {/*<section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">*/}
            <div class="grid gap-2">
                <div class="w-full bg-gray-100 bg-opacity-50 rounded-lg sahdow-lg p-2 flex flex-col justify-center items-center">
                    <div class="mb-2">
                        <img class="object-center pb-2/3 " src={figurine} alt="product" />
                    </div>
                    <div class="text-center">
                        <p class="text-xl text-gray-700 font-normal mb-1">{product.universeDAO.label}</p>
                        <p class="text-base text-black font-bold mb-1">{product.label}</p>
                    </div>
                    <br />
                    <p class="text-base text-white rounded font-bold bg-black pl-2 pr-2 m-1">{product.price} € H.T.</p>
                    <br />
                    <p class="btn btn-light cursor-pointer" onClick={() => {
                        history.push({ pathname: URL_PRODUCTS_DETAILS, state: { product: product } })
                    }}>Voir plus</p>
                </div>
            </div>
            {/*</section>*/}
        </div>
    )

}

export default ProductHomePageCard;